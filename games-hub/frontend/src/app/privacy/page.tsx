'use client';

import Link from 'next/link';
import { useEffect } from 'react';

export default function PrivacyPolicy() {
  // 当页面加载时滚动到顶部
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">隐私政策</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="prose max-w-none">
            <p className="text-gray-500 mb-6">最后更新日期: {new Date().toLocaleDateString('zh-CN')}</p>
            
            <div className="bg-blue-50 p-4 rounded mb-6">
              <p className="text-sm text-blue-800">
                GameHub非常重视您的个人隐私。本隐私政策说明了我们如何收集、使用、披露、处理和保护您通过使用我们的服务提供给我们的信息。在使用我们的服务前，请您仔细阅读并了解本隐私政策的全部内容。
              </p>
            </div>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">1. 信息收集</h2>
            <p className="mb-4">1.1 <strong>您提供的信息</strong></p>
            <p className="mb-4">当您注册账户、填写表单、参与互动功能或与我们联系时，我们可能会收集您提供的以下信息：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">个人识别信息：如姓名、电子邮件地址、用户名和密码</li>
              <li className="mb-2">联系信息：如电话号码（如您选择提供）</li>
              <li className="mb-2">您在平台上的活动：如评论、收藏、评分和游戏互动</li>
              <li className="mb-2">您通过客户支持提供的信息</li>
            </ul>
            
            <p className="mb-4">1.2 <strong>自动收集的信息</strong></p>
            <p className="mb-4">当您访问或使用我们的服务时，我们可能会自动收集以下信息：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">设备信息：如设备型号、操作系统版本、浏览器类型和设备唯一标识符</li>
              <li className="mb-2">日志信息：如IP地址、访问时间、访问的页面和点击记录</li>
              <li className="mb-2">游戏使用数据：如游戏时长、游戏进度和偏好</li>
              <li className="mb-2">位置信息：如IP地址推断的大致位置</li>
              <li className="mb-2">Cookie和类似技术收集的信息</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">2. 信息使用</h2>
            <p className="mb-4">我们使用收集的信息用于以下目的：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">提供、维护和改进我们的服务</li>
              <li className="mb-2">创建和管理您的账户</li>
              <li className="mb-2">验证您的身份并防止欺诈</li>
              <li className="mb-2">处理您的请求和回应您的询问</li>
              <li className="mb-2">发送服务通知和更新</li>
              <li className="mb-2">提供个性化游戏推荐和内容</li>
              <li className="mb-2">分析用户行为和偏好以改善服务</li>
              <li className="mb-2">遵守法律法规要求</li>
            </ul>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">3. Cookie和类似技术</h2>
            <p className="mb-4">3.1 我们使用Cookie和类似技术（如网络信标、像素和本地存储）来收集和存储信息，以便为您提供更好的用户体验。</p>
            <p className="mb-4">3.2 这些技术帮助我们：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">记住您的登录状态和偏好设置</li>
              <li className="mb-2">了解您如何使用我们的服务以进行优化</li>
              <li className="mb-2">为您提供个性化的内容和推荐</li>
              <li className="mb-2">分析网站流量和使用情况</li>
            </ul>
            <p className="mb-4">3.3 您可以通过浏览器设置控制或删除Cookie。但请注意，禁用Cookie可能会影响我们服务的某些功能。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">4. 信息共享与披露</h2>
            <p className="mb-4">4.1 我们不会出售、出租或以其他方式向第三方传递您的个人信息，除非获得您的明确同意或在以下情况下：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2"><strong>服务提供商</strong>：我们可能会与协助我们提供服务的第三方服务提供商共享信息（如云存储、数据分析和客户支持），他们需要遵守严格的保密义务。</li>
              <li className="mb-2"><strong>法律要求</strong>：当我们有合理理由相信需要遵守法律、法规、法律程序或政府要求时。</li>
              <li className="mb-2"><strong>安全保护</strong>：当我们认为披露是为了防止死亡或严重身体伤害，或检测、防止或解决欺诈、安全或技术问题时。</li>
              <li className="mb-2"><strong>企业交易</strong>：如果我们涉及合并、收购、资产出售或破产过程中，您的信息可能会作为企业资产转移。</li>
            </ul>
            <p className="mb-4">4.2 我们仅会共享实现特定目的所必需的信息，并确保接收方采取适当的安全措施保护您的信息。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">5. 数据安全</h2>
            <p className="mb-4">5.1 我们实施了各种安全措施来保护您的个人信息，包括但不限于：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2">数据加密传输</li>
              <li className="mb-2">安全服务器存储</li>
              <li className="mb-2">访问控制机制</li>
              <li className="mb-2">定期安全审核</li>
            </ul>
            <p className="mb-4">5.2 尽管我们采取了合理的措施来保护您的信息，但请理解互联网传输不可能绝对安全，我们无法保证您的信息在传输过程中的绝对安全。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">6. 您的权利与选择</h2>
            <p className="mb-4">根据适用的数据保护法律，您对您的个人信息拥有以下权利：</p>
            <ul className="list-disc pl-6 mb-4">
              <li className="mb-2"><strong>访问权</strong>：您可以要求获取我们持有的关于您的个人信息的副本。</li>
              <li className="mb-2"><strong>更正权</strong>：如果您认为我们持有的个人信息不准确或不完整，您可以要求我们更正。</li>
              <li className="mb-2"><strong>删除权</strong>：在某些情况下，您可以要求我们删除您的个人信息。</li>
              <li className="mb-2"><strong>限制处理权</strong>：在某些情况下，您可以要求我们限制处理您的个人信息。</li>
              <li className="mb-2"><strong>反对权</strong>：在某些情况下，您可以反对我们处理您的个人信息。</li>
              <li className="mb-2"><strong>数据可携带权</strong>：您可以要求我们以结构化、常用的机器可读格式提供您的个人信息。</li>
            </ul>
            <p className="mb-4">如需行使上述权利，请通过下方联系方式与我们联系。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">7. 儿童隐私</h2>
            <p className="mb-4">我们的服务不面向16岁以下的儿童。我们不会故意收集16岁以下儿童的个人信息。如果我们发现自己收集了16岁以下儿童的个人信息，我们会立即采取措施删除这些信息。如果您是父母或监护人，并认为您的孩子向我们提供了个人信息，请与我们联系。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">8. 第三方链接</h2>
            <p className="mb-4">我们的服务可能包含指向第三方网站或服务的链接。我们对这些第三方的隐私实践和内容不负责任。我们建议您阅读这些第三方的隐私政策，以了解他们如何收集和处理您的信息。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">9. 数据存储与跨境传输</h2>
            <p className="mb-4">9.1 我们主要在中国境内的服务器上存储和处理您的个人信息。</p>
            <p className="mb-4">9.2 如需传输数据至境外服务器，我们将严格遵守中国相关法律法规的要求，包括但不限于《中华人民共和国数据安全法》和《中华人民共和国个人信息保护法》，确保数据跨境传输的合规性。</p>
            <p className="mb-4">9.3 在传输您的个人信息至境外之前，我们将采取适当措施确保接收方提供与中国法律同等水平的保护。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">10. 隐私政策更新</h2>
            <p className="mb-4">10.1 我们可能会不时更新本隐私政策。如有重大变更，我们将在网站上发布更新的政策，并在适当的情况下通过电子邮件或网站通知的方式通知您。</p>
            <p className="mb-4">10.2 我们鼓励您定期查看本隐私政策，以了解我们如何保护您的信息。</p>
            <p className="mb-4">10.3 您继续使用我们的服务将被视为接受更新后的隐私政策。</p>
            
            <h2 className="text-xl font-semibold mb-4 mt-6">11. 联系我们</h2>
            <p className="mb-4">如果您对本隐私政策有任何疑问、意见或投诉，或者希望行使您的权利，请通过以下方式联系我们：</p>
            <p className="mb-4 font-medium">电子邮件：privacy@gamehub.com</p>
            <p className="mb-4 font-medium">地址：北京市朝阳区科技园区888号GameHub总部</p>
            <p className="mb-4">我们将在收到您的请求后30天内回复。</p>

            <h2 className="text-xl font-semibold mb-4 mt-6">12. 争议解决</h2>
            <p className="mb-4">如果您对我们处理您的个人信息的方式有任何争议，请首先与我们联系，我们将尽力解决您的问题。如果我们无法解决争议，您有权向相关数据保护监管机构投诉或寻求其他法律救济。</p>
          </div>
          
          <div className="mt-8 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <Link 
                href="/terms" 
                className="text-blue-600 hover:text-blue-800 transition duration-150"
              >
                阅读服务条款
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