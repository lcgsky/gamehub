'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  count: number;
  status: 'active' | 'inactive';
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [isEditingCategory, setIsEditingCategory] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<Partial<Category>>({
    name: '',
    description: '',
    image: '',
    status: 'active'
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟分类数据
      const mockCategories: Category[] = [
        {
          id: '1',
          name: '策略',
          slug: 'strategy',
          description: '考验玩家战略思维的游戏，包括回合制和即时战略游戏。',
          image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=500&auto=format&fit=crop',
          count: 8,
          status: 'active'
        },
        {
          id: '2',
          name: '益智',
          slug: 'puzzle',
          description: '锻炼大脑，挑战思维的益智类游戏。',
          image: 'https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=500&auto=format&fit=crop',
          count: 12,
          status: 'active'
        },
        {
          id: '3',
          name: '休闲',
          slug: 'casual',
          description: '轻松有趣的休闲类游戏。',
          image: 'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=500&auto=format&fit=crop',
          count: 7,
          status: 'active'
        },
        {
          id: '4',
          name: '动作',
          slug: 'action',
          description: '快节奏、考验反应速度和手眼协调能力的游戏。',
          image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=500&auto=format&fit=crop',
          count: 5,
          status: 'active'
        },
        {
          id: '5',
          name: '角色扮演',
          slug: 'rpg',
          description: '沉浸式的角色扮演游戏。',
          image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=500&auto=format&fit=crop',
          count: 3,
          status: 'active'
        },
        {
          id: '6',
          name: '模拟',
          slug: 'simulation',
          description: '模拟现实世界活动的游戏。',
          image: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?q=80&w=500&auto=format&fit=crop',
          count: 4,
          status: 'inactive'
        },
        {
          id: '7',
          name: '射击',
          slug: 'shooting',
          description: '第一人称或第三人称射击游戏。',
          image: 'https://images.unsplash.com/photo-1569086783498-44d435ba44d4?q=80&w=500&auto=format&fit=crop',
          count: 2,
          status: 'active'
        }
      ];

      setCategories(mockCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // 清除对应的错误
    if (formErrors[name]) {
      const updatedErrors = { ...formErrors };
      delete updatedErrors[name];
      setFormErrors(updatedErrors);
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    
    if (!formData.name?.trim()) {
      errors.name = '分类名称不能为空';
    }
    
    if (!formData.description?.trim()) {
      errors.description = '分类描述不能为空';
    }
    
    if (!formData.image?.trim()) {
      errors.image = '请提供分类图片URL';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddCategory = async () => {
    if (!validateForm()) return;
    
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 生成简单的slug
      const slug = formData.name?.toLowerCase().replace(/\s+/g, '-') || '';
      
      // 创建新分类
      const newCategory: Category = {
        id: Date.now().toString(),
        name: formData.name!,
        description: formData.description!,
        image: formData.image!,
        slug,
        count: 0,
        status: formData.status as 'active' | 'inactive' || 'active'
      };
      
      setCategories([...categories, newCategory]);
      
      // 重置表单
      setFormData({
        name: '',
        description: '',
        image: '',
        status: 'active'
      });
      setIsAddingCategory(false);
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!validateForm() || !isEditingCategory) return;
    
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新分类
      const updatedCategories = categories.map(category => 
        category.id === isEditingCategory
          ? { 
              ...category, 
              name: formData.name!, 
              description: formData.description!, 
              image: formData.image!,
              status: formData.status as 'active' | 'inactive'
            }
          : category
      );
      
      setCategories(updatedCategories);
      
      // 重置表单和编辑状态
      setFormData({
        name: '',
        description: '',
        image: '',
        status: 'active'
      });
      setIsEditingCategory(null);
    } catch (error) {
      console.error('Error updating category:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!window.confirm('确定要删除这个分类吗？相关的游戏将会变成未分类状态。')) return;
    
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 删除分类
      const updatedCategories = categories.filter(category => category.id !== id);
      setCategories(updatedCategories);
    } catch (error) {
      console.error('Error deleting category:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditCategory = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      status: category.status
    });
    setIsEditingCategory(category.id);
    setIsAddingCategory(true);
  };

  const cancelForm = () => {
    setIsAddingCategory(false);
    setIsEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      status: 'active'
    });
    setFormErrors({});
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">分类管理</h1>
        {!isAddingCategory && (
          <button
            onClick={() => setIsAddingCategory(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
          >
            添加分类
          </button>
        )}
      </div>

      {/* 添加/编辑分类表单 */}
      {isAddingCategory && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditingCategory ? '编辑分类' : '添加分类'}</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                分类名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${formErrors.name ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.name && (
                <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                分类描述 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className={`w-full p-2 border rounded-md ${formErrors.description ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.description && (
                <p className="mt-1 text-xs text-red-500">{formErrors.description}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                分类图片URL <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full p-2 border rounded-md ${formErrors.image ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.image && (
                <p className="mt-1 text-xs text-red-500">{formErrors.image}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                状态
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="active">启用</option>
                <option value="inactive">禁用</option>
              </select>
            </div>

            <div className="flex space-x-4 mt-2">
              <button
                onClick={isEditingCategory ? handleUpdateCategory : handleAddCategory}
                disabled={isProcessing}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
              >
                {isProcessing ? '处理中...' : (isEditingCategory ? '更新' : '添加')}
              </button>
              <button
                onClick={cancelForm}
                disabled={isProcessing}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-150"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 分类列表 */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载分类数据中...</p>
        </div>
      ) : categories.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">暂无分类数据，请添加分类</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                    ${category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {category.status === 'active' ? '已启用' : '已禁用'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                    <p className="text-gray-500 text-sm mb-2">游戏数量: {category.count}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="text-blue-600 hover:text-blue-800"
                      disabled={isProcessing}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className="text-red-600 hover:text-red-800"
                      disabled={isProcessing}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mt-2">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 