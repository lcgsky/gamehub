'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 用户类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  favorites?: string[];
  role: 'user' | 'admin';  // 确保role为必填字段
}

// 模拟用户数据库
interface UserRecord {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  favorites?: string[];
  role: 'user' | 'admin';  // 确保role为必填字段
}

// 初始模拟用户数据 - 这是权威数据源
const mockUsers: UserRecord[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',  // 保持管理员密码为admin123
    avatar: 'https://i.pravatar.cc/150?img=1',
    favorites: ['1', '3'],
    role: 'admin'
  },
  {
    id: '2',
    username: 'demo',
    email: 'demo@example.com',
    password: 'password123',
    avatar: 'https://i.pravatar.cc/150?img=2',
    favorites: ['2', '5'],
    role: 'user'  // 确保demo用户角色为user
  },
  {
    id: '10',
    username: 'moderator',
    email: 'mod@example.com',
    password: 'mod123',
    avatar: 'https://i.pravatar.cc/150?img=10',
    favorites: ['3', '7', '9'],
    role: 'admin'
  }
];

// 角色权限映射表 - 定义哪些ID对应哪些角色
const ROLE_MAP = {
  admin: ['1', '10'], // 只有ID 1和10可以是管理员
  user: ['2'] // ID 2只能是普通用户
};

// 上下文类型定义
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addToFavorites: (gameId: string) => Promise<void>;
  removeFromFavorites: (gameId: string) => Promise<void>;
  resetSystem: () => void;  // 添加重置系统函数
}

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 清除本地存储，解决可能的缓存问题
const resetLocalStorage = () => {
  try {
    console.log('开始重置本地存储...');
    
    // 检查之前存储的用户数据，如果有问题则清除
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        // 严格检查用户角色与ID是否匹配
        if (userData.id && userData.role) {
          // 如果是demo用户但有admin角色，则清除
          if (userData.id === '2' && userData.role === 'admin') {
            console.log('发现错误的用户角色数据：demo用户不能是管理员，正在清除...');
            localStorage.removeItem('user');
          }
          
          // 如果ID和角色不匹配ROLE_MAP的定义，也清除
          if (userData.role === 'admin' && !ROLE_MAP.admin.includes(userData.id)) {
            console.log(`发现错误的管理员ID: ${userData.id}，正在清除...`);
            localStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('解析用户数据失败', error);
        localStorage.removeItem('user');
      }
    }
    
    // 重新设置注册用户数据为初始数据
    localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
    console.log('已重置注册用户数据');
  } catch (error) {
    console.error('重置本地存储时出错:', error);
    // 如果有任何错误，清除所有相关数据重新开始
    localStorage.removeItem('user');
    localStorage.removeItem('registeredUsers');
    localStorage.removeItem('adminAccess');
  }
};

// 验证用户数据是否有效
const validateUserData = (userData: any): boolean => {
  if (!userData || typeof userData !== 'object') return false;
  
  // 检查必要字段
  if (!userData.id || !userData.username || !userData.role) return false;
  
  // 验证角色是否正确
  if (userData.role !== 'user' && userData.role !== 'admin') return false;
  
  // 验证角色与ID是否匹配
  if (userData.role === 'admin' && !ROLE_MAP.admin.includes(userData.id)) return false;
  if (userData.id === '2' && userData.role !== 'user') return false;
  
  return true;
};

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredUsers, setRegisteredUsers] = useState<UserRecord[]>(mockUsers);

  // 系统重置函数
  const resetSystem = () => {
    // 清除所有本地存储
    if (typeof window !== 'undefined') {
      localStorage.clear();
      
      // 重新设置初始用户数据
      localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
      
      // 清除当前用户
      setUser(null);
      setRegisteredUsers(mockUsers);
      
      console.log('系统已完全重置');
      
      // 强制刷新页面以确保所有状态重置
      window.location.href = '/';
    }
  };

  // 初始化时检查本地存储中是否有用户数据
  useEffect(() => {
    const loadUser = () => {
      // 在首次加载时重置本地存储，解决可能的缓存问题
      resetLocalStorage();
      
      const savedUser = localStorage.getItem('user');
      
      // 加载已注册用户数据
      const savedUsers = localStorage.getItem('registeredUsers');
      if (savedUsers) {
        try {
          // 验证并过滤保存的用户数据
          const parsedUsers = JSON.parse(savedUsers);
          
          // 确保demo用户始终是普通用户角色
          const validUsers = parsedUsers.map((u: UserRecord) => {
            // ID为2的用户必须是普通用户
            if (u.id === '2') {
              return { ...u, role: 'user' };
            }
            // ID为1或10的才能是管理员
            if (u.role === 'admin' && !ROLE_MAP.admin.includes(u.id)) {
              return { ...u, role: 'user' };
            }
            return u;
          });
          
          setRegisteredUsers(validUsers);
          localStorage.setItem('registeredUsers', JSON.stringify(validUsers));
        } catch (error) {
          console.error('解析已注册用户数据失败', error);
          // 如果解析失败，使用默认的mockUsers
          setRegisteredUsers(mockUsers);
          localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
        }
      } else {
        // 如果本地存储中没有注册用户数据，则保存初始模拟数据
        localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
      }
      
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          
          // 验证用户数据的有效性
          if (!validateUserData(parsedUser)) {
            console.warn('无效的用户数据，重置中...');
            localStorage.removeItem('user');
            setUser(null);
          } else {
            // 确保角色与ID匹配
            if (parsedUser.id === '2') {
              parsedUser.role = 'user'; // demo用户只能是普通用户
            }
            
            // 只有ID为1和10的才能是管理员
            if (parsedUser.role === 'admin' && !ROLE_MAP.admin.includes(parsedUser.id)) {
              parsedUser.role = 'user';
            }
            
            setUser(parsedUser);
            // 保存修正后的数据
            localStorage.setItem('user', JSON.stringify(parsedUser));
          }
        } catch (error) {
          console.error('解析用户数据失败', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    };

    loadUser();
  }, []);

  // 登录函数
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // 模拟服务器请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 查找用户
      const foundUser = registeredUsers.find(
        user => (user.email === email || user.username === email) && user.password === password
      );
      
      if (!foundUser) {
        throw new Error('邮箱/用户名或密码不正确');
      }
      
      // 移除密码字段，创建用户对象
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // 确保用户角色与ID匹配
      let userData = { ...userWithoutPassword };
      
      // 特殊处理: ID 2 必须是普通用户
      if (userData.id === '2') {
        userData.role = 'user';
      }
      
      // 只有ID 1和10允许是管理员
      if (userData.role === 'admin' && !ROLE_MAP.admin.includes(userData.id)) {
        userData.role = 'user';
      }
      
      console.log('用户登录成功:', userData);
      
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('登录失败', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 注册函数
  const register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // 模拟服务器请求延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 检查用户名和邮箱是否已存在
      if (registeredUsers.some(user => user.username === username)) {
        throw new Error('用户名已被注册');
      }
      
      if (registeredUsers.some(user => user.email === email)) {
        throw new Error('邮箱已被注册');
      }
      
      // 创建新用户，确保使用大于10的ID避免与管理员ID冲突
      const newUser: UserRecord = {
        id: `${Date.now()}`,
        username,
        email,
        password,
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        favorites: [],
        role: 'user'  // 新注册用户默认为普通用户角色
      };
      
      // 更新注册用户列表
      const updatedUsers = [...registeredUsers, newUser];
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
      
      // 移除密码字段，创建用户对象
      const { password: _, ...userWithoutPassword } = newUser;
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('注册失败', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 退出登录函数
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // 清除任何可能导致问题的缓存
    localStorage.removeItem('adminAccess');
  };

  // 添加到收藏
  const addToFavorites = async (gameId: string) => {
    if (!user) return;
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedFavorites = [...(user.favorites || []), gameId];
      const updatedUser = { ...user, favorites: updatedFavorites };
      
      // 更新当前用户
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // 同时更新注册用户列表
      const updatedUsers = registeredUsers.map(u => 
        u.id === user.id ? { ...u, favorites: updatedFavorites } : u
      );
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('添加游戏到收藏失败', error);
      throw new Error('添加收藏失败');
    }
  };

  // 从收藏中移除
  const removeFromFavorites = async (gameId: string) => {
    if (!user || !user.favorites) return;
    
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedFavorites = user.favorites.filter(id => id !== gameId);
      const updatedUser = { ...user, favorites: updatedFavorites };
      
      // 更新当前用户
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // 同时更新注册用户列表
      const updatedUsers = registeredUsers.map(u => 
        u.id === user.id ? { ...u, favorites: updatedFavorites } : u
      );
      setRegisteredUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));
    } catch (error) {
      console.error('从收藏中移除游戏失败', error);
      throw new Error('移除收藏失败');
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    addToFavorites,
    removeFromFavorites,
    resetSystem
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

// 自定义钩子，用于在组件中使用上下文
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
} 