'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FormField {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required: boolean;
}

interface AuthFormProps {
  title: string;
  fields: FormField[];
  submitText: string;
  onSubmit: (data: Record<string, string>) => void;
  isLoading: boolean;
  error?: string;
  redirectText?: string;
  redirectLink?: string;
  redirectLinkText?: string;
}

const AuthForm = ({
  title,
  fields,
  submitText,
  onSubmit,
  isLoading,
  error,
  redirectText,
  redirectLink,
  redirectLinkText
}: AuthFormProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    
    // 基本验证
    if (e.target.required && !value.trim()) {
      setFormErrors({ ...formErrors, [id]: `${e.target.placeholder}不能为空` });
    } else if (id === 'email' && value && !/\S+@\S+\.\S+/.test(value) && !e.target.placeholder.includes('用户名')) {
      // 只有当字段是纯邮箱字段（没有包含用户名选项）时才验证邮箱格式
      setFormErrors({ ...formErrors, [id]: '邮箱格式不正确' });
    } else if (id === 'password' && value && value.length < 6) {
      setFormErrors({ ...formErrors, [id]: '密码长度不能少于6位' });
    } else {
      // 清除错误
      const updatedErrors = { ...formErrors };
      delete updatedErrors[id];
      setFormErrors(updatedErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 检查所有必填字段
    const errors: Record<string, string> = {};
    fields.forEach(field => {
      if (field.required && !formData[field.id]) {
        errors[field.id] = `${field.placeholder}不能为空`;
      }
    });
    
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {fields.map((field) => (
          <div key={field.id} className="mb-4">
            <label htmlFor={field.id} className="block text-gray-700 text-sm font-medium mb-1">
              {field.label}{field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              id={field.id}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              value={formData[field.id] || ''}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                formErrors[field.id] ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors[field.id] && (
              <p className="mt-1 text-xs text-red-500">{formErrors[field.id]}</p>
            )}
          </div>
        ))}
        
        <button
          type="submit"
          disabled={isLoading || Object.keys(formErrors).length > 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-150 disabled:bg-blue-400 mt-6"
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              处理中...
            </span>
          ) : (
            submitText
          )}
        </button>
      </form>
      
      {redirectText && redirectLink && redirectLinkText && (
        <p className="mt-4 text-center text-sm text-gray-600">
          {redirectText}{' '}
          <Link href={redirectLink} className="text-blue-600 hover:text-blue-800">
            {redirectLinkText}
          </Link>
        </p>
      )}
      
      {/* 添加服务条款和隐私政策链接 */}
      <div className="mt-4 text-center text-xs text-gray-500">
        继续使用即表示您同意我们的
        <Link href="/terms" className="text-blue-600 hover:text-blue-800 mx-1">
          服务条款
        </Link>
        和
        <Link href="/privacy" className="text-blue-600 hover:text-blue-800 ml-1">
          隐私政策
        </Link>
      </div>
    </div>
  );
};

export default AuthForm; 