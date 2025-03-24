'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function TermsOfService() {
  // 当页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">服务条款</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">最后更新日期: {new Date().toLocaleDateString('zh-CN')}</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">1. 接受条款</h2>
            <p className="mb-4">欢迎使用GameHub游戏聚合平台（以下简称"平台"）。通过访问或使用我们的服务，您确认您已阅读、理解并同意遵守本服务条款。如果您不同意本条款的任何部分，请勿使用我们的服务。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">2. 服务描述</h2>
            <p className="mb-4">GameHub是一个游戏聚合平台，为用户提供在线游戏体验和相关服务。我们提供的服务包括但不限于：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">在线游戏聚合与分类展示</li>
              <li className="mb-2">用户账户管理</li>
              <li className="mb-2">游戏评论与评分</li>
              <li className="mb-2">游戏收藏功能</li>
              <li className="mb-2">游戏社区互动</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">3. 账户注册与安全</h2>
            <p className="mb-4">3.1 在使用我们的某些服务时，您可能需要创建一个账户。您有责任保护您的账户信息，包括密码的保密性，并对所有使用您账户进行的活动负责。</p>
            <p className="mb-4">3.2 您确保您提供的所有注册信息均准确、真实和完整，并在信息变更时及时更新。</p>
            <p className="mb-4">3.3 如果您发现任何未经授权使用您账户的情况，请立即通知我们。我们不对您因未能遵守此条款而导致的任何损失负责。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">4. 用户行为规范</h2>
            <p className="mb-4">您同意不会使用平台进行以下活动：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">发布、上传、分享任何非法、有害、威胁、虐待、骚扰、诽谤、侮辱、仇恨、种族主义或其他令人反感的内容</li>
              <li className="mb-2">冒充任何个人或实体，或虚假陈述您与任何个人或实体的关系</li>
              <li className="mb-2">干扰、破坏或对平台施加过大负担</li>
              <li className="mb-2">收集或存储其他用户的个人数据</li>
              <li className="mb-2">使用自动化手段或脚本访问平台内容</li>
              <li className="mb-2">违反任何适用的法律法规</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">5. 知识产权</h2>
            <p className="mb-4">5.1 平台内容，包括但不限于文本、图形、徽标、图标、图像以及软件，均为平台或其内容提供商的财产，受版权、商标和其他知识产权法律的保护。</p>
            <p className="mb-4">5.2 未经平台明确书面许可，您不得复制、修改、发布、传输、分发、销售、衍生、创建或利用平台内容的任何部分。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">6. 用户内容</h2>
            <p className="mb-4">6.1 您保留您在平台上发布的内容（包括评论、点评、反馈等）的所有权利。</p>
            <p className="mb-4">6.2 通过在平台上发布内容，您授予平台全球性、非排他性、免版税的许可，允许使用、复制、修改、改编、出版、翻译、分发和展示此类内容。</p>
            <p className="mb-4">6.3 您对您发布的内容负全部责任，并承诺该内容不会侵犯任何第三方的权利。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">7. 服务变更与终止</h2>
            <p className="mb-4">7.1 平台保留在任何时候修改或终止服务的权利，恕不另行通知。</p>
            <p className="mb-4">7.2 平台有权在适当情况下，在不另行通知的情况下终止您的账户或访问权限。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">8. 免责声明</h2>
            <p className="mb-4">8.1 平台按"现状"和"可用性"提供，不提供任何明示或暗示的保证。</p>
            <p className="mb-4">8.2 平台不保证服务将不间断、及时、安全或无错误，也不保证缺陷将被纠正。</p>
            <p className="mb-4">8.3 平台不对第三方提供的游戏内容质量、合法性负责。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">9. 责任限制</h2>
            <p className="mb-4">在适用法律允许的最大范围内，平台及其管理人员、董事、员工和代理人在任何情况下均不对因使用或无法使用服务而产生的任何直接、间接、附带、特殊、惩罚性或后果性损害负责。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">10. 适用法律</h2>
            <p className="mb-4">本条款受中华人民共和国法律管辖，并按其解释，不考虑法律冲突原则。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">11. 条款变更</h2>
            <p className="mb-4">平台保留随时修改本条款的权利。修改后的条款将在平台上发布，并自发布之日起生效。您继续使用服务将被视为接受修改后的条款。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">12. 联系我们</h2>
            <p className="mb-4">如果您对本服务条款有任何疑问，请通过以下方式联系我们：</p>
            <p className="mb-4 font-medium">电子邮件：support@gamehub.com</p>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-800 transition duration-150"
              >
                阅读隐私政策
              </Link>
              <Link 
                href="/" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-150"
              >
                返回首页
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 