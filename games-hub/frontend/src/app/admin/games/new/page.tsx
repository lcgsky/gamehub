'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GamePlugin } from '@/types/game';

interface GameFormData {
  name: string;
  description: string;
  type: string;
  url: string;
  category: string;
  status: string;
  thumbnail: string;
  tags: string[];
  config: {
    width: number;
    height: number;
    allowFullscreen: boolean;
  };
  instructions?: string;
}

export default function AddGamePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  
  // 表单数据
  const [formData, setFormData] = useState<GameFormData>({
    name: '',
    description: '',
    type: 'iframe',
    url: '',
    category: '',
    status: 'inactive',
    thumbnail: '',
    tags: [],
    config: {
      width: 800,
      height: 600,
      allowFullscreen: true
    },
    instructions: ''
  });
  
  // 加载分类数据
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // 模拟API请求获取分类列表
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟分类数据
        setCategories(['策略', '角色扮演', '益智', '体育', '动作', '休闲', '射击', '模拟']);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        setError('加载分类失败，请刷新页面重试');
      }
    };
    
    fetchCategories();
  }, []);
  
  // 处理输入变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    // 处理嵌套的config属性
    if (name.startsWith('config.')) {
      const configKey = name.split('.')[1];
      const configValue = e.target.type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : e.target.type === 'number' 
          ? parseFloat(value) 
          : value;
          
      setFormData(prev => ({
        ...prev,
        config: {
          ...prev.config,
          [configKey]: configValue
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // 添加标签
  const handleAddTag = () => {
    if (!tagInput.trim()) return;
    
    // 避免重复标签
    if (!formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
    }
    
    setTagInput('');
  };
  
  // 删除标签
  const handleRemoveTag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };
  
  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // 验证必填字段
      if (!formData.name || !formData.description || !formData.url || !formData.category) {
        throw new Error('请填写所有必填字段');
      }
      
      // 模拟API调用创建游戏
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 模拟创建成功
      console.log('Game created:', formData);
      
      // 重定向到游戏列表页
      router.push('/admin/games');
    } catch (error) {
      console.error('Failed to create game:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('创建游戏失败，请重试');
      }
      setIsLoading(false);
    }
  };
  
  // 预览游戏URL
  const handlePreviewGame = () => {
    if (!formData.url) {
      alert('请先输入游戏URL');
      return;
    }
    
    window.open(formData.url, '_blank');
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">添加新游戏</h1>
        <Link 
          href="/admin/games" 
          className="text-blue-600 hover:underline flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          返回游戏列表
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 基本信息 */}
            <div className="md:col-span-2">
              <h2 className="text-lg font-semibold mb-4">基本信息</h2>
            </div>
            
            {/* 游戏名称 */}
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">游戏名称 *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            {/* 游戏描述 */}
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">游戏描述 *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            
            {/* 游戏类型 */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">游戏类型 *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="iframe">iframe嵌入</option>
                <option value="api">API调用</option>
                <option value="custom">自定义集成</option>
              </select>
            </div>
            
            {/* 游戏分类 */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">游戏分类 *</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">选择分类</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            {/* 游戏URL */}
            <div className="md:col-span-2">
              <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">游戏URL *</label>
              <div className="flex">
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={handlePreviewGame}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-150"
                >
                  预览
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">对于iframe游戏，这应该是可直接嵌入的URL</p>
            </div>
            
            {/* 缩略图URL */}
            <div className="md:col-span-2">
              <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-1">缩略图URL *</label>
              <input
                type="url"
                id="thumbnail"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">推荐尺寸：800x600像素，JPEG或PNG格式</p>
            </div>
            
            {/* 游戏状态 */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">游戏状态</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">上线</option>
                <option value="inactive">下线</option>
              </select>
            </div>
            
            {/* 标签 */}
            <div className="md:col-span-2">
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">标签</label>
              <div className="flex">
                <input
                  type="text"
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  className="w-full border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="输入标签并按回车或点击添加"
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700 transition duration-150"
                >
                  添加
                </button>
              </div>
              
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map(tag => (
                    <div key={tag} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-sm flex items-center">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 rounded-full text-blue-600 hover:text-blue-800 focus:outline-none"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* 游戏配置 */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold mb-4">游戏配置</h2>
            </div>
            
            {/* 游戏宽度 */}
            <div>
              <label htmlFor="config.width" className="block text-sm font-medium text-gray-700 mb-1">游戏宽度 (像素)</label>
              <input
                type="number"
                id="config.width"
                name="config.width"
                value={formData.config.width}
                onChange={handleInputChange}
                min="100"
                max="2000"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* 游戏高度 */}
            <div>
              <label htmlFor="config.height" className="block text-sm font-medium text-gray-700 mb-1">游戏高度 (像素)</label>
              <input
                type="number"
                id="config.height"
                name="config.height"
                value={formData.config.height}
                onChange={handleInputChange}
                min="100"
                max="2000"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* 是否允许全屏 */}
            <div className="md:col-span-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="config.allowFullscreen"
                  name="config.allowFullscreen"
                  checked={formData.config.allowFullscreen}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    config: {
                      ...prev.config,
                      allowFullscreen: e.target.checked
                    }
                  }))}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="config.allowFullscreen" className="ml-2 block text-sm text-gray-700">
                  允许全屏模式
                </label>
              </div>
            </div>
            
            {/* 游戏说明 */}
            <div className="md:col-span-2 mt-4">
              <h2 className="text-lg font-semibold mb-4">游戏说明</h2>
            </div>
            
            {/* 操作指南 */}
            <div className="md:col-span-2">
              <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-1">操作指南</label>
              <textarea
                id="instructions"
                name="instructions"
                value={formData.instructions || ''}
                onChange={handleInputChange}
                rows={6}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="输入游戏操作指南，支持基本的markdown格式"
              ></textarea>
            </div>
            
            {/* 提交按钮 */}
            <div className="md:col-span-2 mt-6 flex justify-end">
              <Link 
                href="/admin/games" 
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition duration-150 mr-4"
              >
                取消
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    保存中...
                  </span>
                ) : '保存游戏'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 