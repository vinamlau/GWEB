#!/bin/bash

echo "🚀 开始初始化站点内容..."

DB_PATH="config/gweb_cms.db"

# 检查数据库是否存在
if [ ! -f "$DB_PATH" ]; then
    echo "❌ 数据库文件不存在：$DB_PATH"
    exit 1
fi

echo "✅ 数据库文件存在"

# 添加标准页面
echo "📄 创建标准页面..."

sqlite3 "$DB_PATH" "DELETE FROM pages;"

sqlite3 "$DB_PATH" "INSERT INTO pages (title, slug, content, seoTitle, seoDescription, active) VALUES (
'首页',
'home',
'<div class=\"hero-section\">
  <h1>欢迎来到集团公司</h1>
  <p>专业的边缘算力、支付金融、电商服务提供商</p>
</div>
<div class=\"features-section\">
  <h2>我们的优势</h2>
  <div class=\"feature-grid\">
    <div class=\"feature-item\">
      <h3>技术创新</h3>
      <p>持续推动技术创新，引领行业发展</p>
    </div>
    <div class=\"feature-item\">
      <h3>专业服务</h3>
      <p>提供专业化的服务，满足客户多样化需求</p>
    </div>
    <div class=\"feature-item\">
      <h3>全球布局</h3>
      <p>业务覆盖全球，服务世界各地客户</p>
    </div>
  </div>
</div>',
'集团公司 - 首页',
'专业的边缘算力、支付金融、电商服务提供商',
1
);"

sqlite3 "$DB_PATH" "INSERT INTO pages (title, slug, content, seoTitle, seoDescription, active) VALUES (
'关于我们',
'about',
'<div class=\"about-content\">
  <h1>关于我们</h1>
  <h2>公司简介</h2>
  <p>集团公司是一家专注于边缘算力、支付金融和电商业务的综合性企业集团。我们致力于为客户提供最优质的产品和服务，推动行业创新发展。</p>
  
  <h2>我们的使命</h2>
  <p>通过技术创新和服务升级，为客户创造价值，为员工提供发展平台，为社会贡献力量。</p>
  
  <h2>核心价值观</h2>
  <ul>
    <li>客户至上 - 始终以客户需求为导向</li>
    <li>创新驱动 - 持续推动技术创新和商业模式创新</li>
    <li>诚信共赢 - 与合作伙伴建立长期共赢的合作关系</li>
    <li>社会责任 - 积极履行社会责任，回馈社会</li>
  </ul>
  
  <h2>发展历程</h2>
  <p>多年来，集团公司始终坚持高质量发展道路，不断壮大业务规模，提升核心竞争力，已成为行业领先的企业集团。</p>
</div>',
'关于我们 - 集团公司',
'了解集团公司的使命、愿景和核心价值观',
1
);"

sqlite3 "$DB_PATH" "INSERT INTO pages (title, slug, content, seoTitle, seoDescription, active) VALUES (
'联系我们',
'contact',
'<div class=\"contact-content\">
  <h1>联系我们</h1>
  
  <div class=\"contact-info\">
    <h2>联系方式</h2>
    <p><strong>公司名称：</strong>集团公司</p>
    <p><strong>联系电话：</strong>400-xxx-xxxx</p>
    <p><strong>电子邮箱：</strong>contact@example.com</p>
    <p><strong>办公地址：</strong>北京市朝阳区 xxx 路 xxx 号</p>
  </div>
  
  <div class=\"business-hours\">
    <h2>营业时间</h2>
    <p>周一至周五：9:00 - 18:00</p>
    <p>周六至周日：休息</p>
  </div>
  
  <div class=\"contact-form\">
    <h2>在线留言</h2>
    <p>如果您有任何问题或建议，欢迎填写以下表单，我们将尽快与您联系。</p>
  </div>
</div>',
'联系我们 - 集团公司',
'与集团公司取得联系，获取更多信息和支持',
1
);"

echo "✅ 标准页面创建完成"

# 添加默认页脚配置
echo "🔽 创建默认页脚配置..."

sqlite3 "$DB_PATH" "DELETE FROM footers;"

sqlite3 "$DB_PATH" "INSERT INTO footers (company_name, description, address, phone, email, icp_license, social_links, active) VALUES (
'集团公司',
'专业的边缘算力、支付金融、电商服务提供商',
'北京市朝阳区 xxx 路 xxx 号',
'400-xxx-xxxx',
'contact@example.com',
'京 ICP 备 xxxxxxxx 号',
'{\"wechat\":\"\",\"weibo\":\"\",\"github\":\"\"}',
1
);"

echo "✅ 默认页脚配置创建完成"

echo ""
echo "🎉 初始化完成！"
echo ""
echo "已创建以下内容："
echo "✅ 首页 (home)"
echo "✅ 关于我们 (about)"
echo "✅ 联系我们 (contact)"
echo "✅ 默认页脚配置"
echo ""
echo "现在可以访问后台管理查看和编辑这些内容："
echo "http://localhost:5173/admin/pages"
echo "http://localhost:5173/admin/footer"
