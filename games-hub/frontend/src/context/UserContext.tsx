'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// 用户类型定义
export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  favorites?: string[];
  role?: 'user' | 'admin';  // 添加角色字段
}

// 模拟用户数据库
interface UserRecord {
  id: string;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  favorites?: string[];
  role: 'user' | 'admin';  // 添加角色字段
}

// 初始模拟用户数据
const mockUsers: UserRecord[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
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
    role: 'user'
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

// 上下文类型定义
interface UserContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addToFavorites: (gameId: string) => Promise<void>;
  removeFromFavorites: (gameId: string) => Promise<void>;
}

// 创建上下文
const UserContext = createContext<UserContextType | undefined>(undefined);

// 上下文提供者组件
export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [registeredUsers, setRegisteredUsers] = useState<UserRecord[]>(mockUsers);

  // 初始化时检查本地存储中是否有用户数据
  useEffect(() => {
    const loadUser = () => {
      const savedUser = localStorage.getItem('user');
      
      // 加载已注册用户数据
      const savedUsers = localStorage.getItem('registeredUsers');
      if (savedUsers) {
        try {
          setRegisteredUsers(JSON.parse(savedUsers));
        } catch (error) {
          console.error('Failed to parse registered users data', error);
        }
      } else {
        // 如果本地存储中没有注册用户数据，则保存初始模拟数据
        localStorage.setItem('registeredUsers', JSON.stringify(mockUsers));
      }
      
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (error) {
          console.error('Failed to parse user data', error);
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
      
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      console.error('Login failed', error);
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
      
      // 创建新用户
      const newUser: UserRecord = {
        id: Date.now().toString(),
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
      console.error('Registration failed', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // 退出登录函数
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
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
      console.error('Failed to add game to favorites', error);
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
      console.error('Failed to remove game from favorites', error);
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
    removeFromFavorites
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