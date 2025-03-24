'use client';

import { useState, useEffect } from 'react';

interface Tag {
  id: string;
  name: string;
  count: number;
  createdAt: string;
}

export default function AdminTagsPage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [isEditingTag, setIsEditingTag] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tagName, setTagName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTags();
  }, []);

  // 筛选标签
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTags(tags);
    } else {
      const lowerCaseSearch = searchTerm.toLowerCase();
      setFilteredTags(tags.filter(tag => 
        tag.name.toLowerCase().includes(lowerCaseSearch)
      ));
    }
  }, [tags, searchTerm]);

  const fetchTags = async () => {
    setIsLoading(true);
    try {
      // 模拟API延迟
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 模拟标签数据
      const mockTags: Tag[] = [
        { id: '1', name: '太空', count: 5, createdAt: '2023-10-15T08:30:00Z' },
        { id: '2', name: '策略', count: 12, createdAt: '2023-10-10T14:45:00Z' },
        { id: '3', name: '探索', count: 8, createdAt: '2023-10-05T09:20:00Z' },
        { id: '4', name: '益智', count: 15, createdAt: '2023-09-28T16:15:00Z' },
        { id: '5', name: '动作', count: 20, createdAt: '2023-09-20T11:10:00Z' },
        { id: '6', name: '多人', count: 7, createdAt: '2023-09-15T13:25:00Z' },
        { id: '7', name: '竞速', count: 6, createdAt: '2023-09-10T10:30:00Z' },
        { id: '8', name: '角色扮演', count: 9, createdAt: '2023-09-05T15:40:00Z' },
        { id: '9', name: '回合制', count: 4, createdAt: '2023-08-28T09:15:00Z' },
        { id: '10', name: '模拟', count: 11, createdAt: '2023-08-20T14:50:00Z' },
        { id: '11', name: '休闲', count: 18, createdAt: '2023-08-15T11:35:00Z' },
        { id: '12', name: '冒险', count: 14, createdAt: '2023-08-10T16:25:00Z' },
        { id: '13', name: '射击', count: 10, createdAt: '2023-08-05T13:40:00Z' },
        { id: '14', name: '沙盒', count: 3, createdAt: '2023-07-28T10:20:00Z' },
        { id: '15', name: '像素', count: 6, createdAt: '2023-07-20T15:30:00Z' }
      ];

      setTags(mockTags);
      setFilteredTags(mockTags);
    } catch (error) {
      console.error('Error fetching tags:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTag = async () => {
    if (!validateTagName()) return;
    
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 创建新标签
      const newTag: Tag = {
        id: Date.now().toString(),
        name: tagName.trim(),
        count: 0,
        createdAt: new Date().toISOString()
      };
      
      setTags([...tags, newTag]);
      setTagName('');
      setIsAddingTag(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding tag:', error);
      setErrorMessage('添加标签失败，请稍后再试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdateTag = async () => {
    if (!validateTagName() || !isEditingTag) return;
    
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 更新标签
      const updatedTags = tags.map(tag => 
        tag.id === isEditingTag
          ? { ...tag, name: tagName.trim() }
          : tag
      );
      
      setTags(updatedTags);
      setTagName('');
      setIsEditingTag(null);
      setIsAddingTag(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error updating tag:', error);
      setErrorMessage('更新标签失败，请稍后再试');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteTag = async (id: string) => {
    // 检查标签是否被游戏使用
    const tagToDelete = tags.find(tag => tag.id === id);
    if (tagToDelete && tagToDelete.count > 0) {
      if (!window.confirm(`该标签已被 ${tagToDelete.count} 个游戏使用，确定要删除吗？`)) {
        return;
      }
    } else {
      if (!window.confirm('确定要删除这个标签吗？')) {
        return;
      }
    }
    
    setIsProcessing(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // 删除标签
      const updatedTags = tags.filter(tag => tag.id !== id);
      setTags(updatedTags);
    } catch (error) {
      console.error('Error deleting tag:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditTag = (tag: Tag) => {
    setTagName(tag.name);
    setIsEditingTag(tag.id);
    setIsAddingTag(true);
    setErrorMessage('');
  };

  const validateTagName = () => {
    if (!tagName.trim()) {
      setErrorMessage('标签名称不能为空');
      return false;
    }
    
    const isDuplicate = tags.some(tag => 
      tag.name.toLowerCase() === tagName.trim().toLowerCase() && 
      tag.id !== isEditingTag
    );
    
    if (isDuplicate) {
      setErrorMessage('标签名称已存在');
      return false;
    }
    
    return true;
  };

  const cancelTagForm = () => {
    setTagName('');
    setIsAddingTag(false);
    setIsEditingTag(null);
    setErrorMessage('');
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">标签管理</h1>
        {!isAddingTag && (
          <button
            onClick={() => setIsAddingTag(true)}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150"
          >
            添加标签
          </button>
        )}
      </div>

      {/* 添加/编辑标签表单 */}
      {isAddingTag && (
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">{isEditingTag ? '编辑标签' : '添加标签'}</h2>
          
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label htmlFor="tagName" className="block text-sm font-medium text-gray-700 mb-1">
                标签名称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tagName"
                value={tagName}
                onChange={(e) => setTagName(e.target.value)}
                className={`w-full p-2 border rounded-md ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="输入标签名称"
              />
              {errorMessage && (
                <p className="mt-1 text-xs text-red-500">{errorMessage}</p>
              )}
            </div>

            <div className="flex space-x-4 mt-2">
              <button
                onClick={isEditingTag ? handleUpdateTag : handleAddTag}
                disabled={isProcessing}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 disabled:bg-blue-400"
              >
                {isProcessing ? '处理中...' : (isEditingTag ? '更新' : '添加')}
              </button>
              <button
                onClick={cancelTagForm}
                disabled={isProcessing}
                className="bg-gray-200 text-gray-800 py-2 px-4 rounded hover:bg-gray-300 transition duration-150"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 搜索栏 */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="搜索标签..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border border-gray-300 rounded-md"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* 标签列表 */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">加载标签数据中...</p>
        </div>
      ) : filteredTags.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <p className="text-gray-600">{searchTerm ? '没有找到符合条件的标签' : '暂无标签数据，请添加标签'}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  标签名称
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  使用次数
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  创建日期
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  操作
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTags.map((tag) => (
                <tr key={tag.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{tag.count} 个游戏</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(tag.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEditTag(tag)}
                        className="text-blue-600 hover:text-blue-900 transition duration-150"
                        disabled={isProcessing}
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeleteTag(tag.id)}
                        className="text-red-600 hover:text-red-900 transition duration-150"
                        disabled={isProcessing}
                      >
                        删除
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 