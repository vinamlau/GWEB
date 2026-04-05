#!/bin/bash

# CMS 系统全功能自动化测试脚本

echo "=========================================="
echo "CMS 系统全功能自动化测试"
echo "=========================================="
echo ""

API_URL="http://localhost:3001"
TOKEN=""

# 颜色定义
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 测试函数
test_api() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local expected_status=$5
    
    echo -n "测试：$name ... "
    
    if [ "$method" == "GET" ]; then
        response=$(curl -s -w "\n%{http_code}" "$API_URL$endpoint")
    else
        response=$(curl -s -w "\n%{http_code}" -X "$method" "$API_URL$endpoint" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $TOKEN" \
            -d "$data")
    fi
    
    http_code=$(echo "$response" | tail -n1)
    body=$(echo "$response" | sed '$d')
    
    if [ "$http_code" == "$expected_status" ]; then
        echo -e "${GREEN}✓ 通过${NC} (状态码：$http_code)"
        return 0
    else
        echo -e "${RED}✗ 失败${NC} (期望：$expected_status, 实际：$http_code)"
        echo "响应：$body"
        return 1
    fi
}

# 1. 测试登录获取 Token
echo "1. 测试用户认证"
echo "------------------------------------------"
login_response=$(curl -s -X POST "$API_URL/api/auth/login" \
    -H "Content-Type: application/json" \
    -d '{"email":"admin@example.com","password":"admin123456"}')

TOKEN=$(echo "$login_response" | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
    echo -e "${GREEN}✓ 登录成功${NC}"
    echo "Token: ${TOKEN:0:50}..."
else
    echo -e "${RED}✗ 登录失败${NC}"
    echo "响应：$login_response"
    exit 1
fi
echo ""

# 2. 测试页面管理
echo "2. 测试页面管理功能"
echo "------------------------------------------"
test_api "获取页面列表" "GET" "/api/pages" "" "200"
test_api "获取首页内容" "GET" "/api/pages/home" "" "200"
test_api "获取关于我们内容" "GET" "/api/pages/about" "" "200"
test_api "获取联系我们内容" "GET" "/api/pages/contact" "" "200"

# 创建测试页面
test_api "创建测试页面" "POST" "/api/pages" \
    '{"title":"测试页面","slug":"test-page","content":"<p>测试内容</p>","seoTitle":"测试","seoDescription":"测试描述","active":true}' \
    "201"

# 更新测试页面
test_api "更新测试页面" "PUT" "/api/pages/999" \
    '{"title":"测试页面 - 已更新","slug":"test-page","content":"<p>更新后的内容</p>","seoTitle":"更新测试","seoDescription":"更新描述","active":true}' \
    "200"
echo ""

# 3. 测试页脚配置
echo "3. 测试页脚配置功能"
echo "------------------------------------------"
test_api "获取页脚配置" "GET" "/api/footer" "" "200"
test_api "获取启用的页脚" "GET" "/api/footer/active" "" "200"
test_api "更新页脚配置" "PUT" "/api/footer/2" \
    '{"companyName":"测试集团公司","description":"测试描述","address":"测试地址","phone":"400-123-4567","email":"test@example.com","icpLicense":"测试 ICP","socialLinks":{"wechat":"test_wechat","weibo":"test_weibo","github":"test_github"},"active":true}' \
    "200"
echo ""

# 4. 测试站点配置
echo "4. 测试站点配置功能"
echo "------------------------------------------"
test_api "获取站点配置" "GET" "/api/config" "" "200"
test_api "更新网站名称" "PUT" "/api/config/siteName" \
    '{"value":"测试集团","description":"测试网站名称"}' \
    "200"
test_api "更新联系邮箱" "PUT" "/api/config/contactEmail" \
    '{"value":"test@example.com","description":"测试邮箱"}' \
    "200"
echo ""

# 5. 测试菜单管理
echo "5. 测试菜单管理功能"
echo "------------------------------------------"
test_api "获取菜单列表" "GET" "/api/menus" "" "200"
test_api "创建菜单项" "POST" "/api/menus" \
    '{"title":"测试菜单","url":"/test","parentId":null,"order":99,"active":true}' \
    "201"
test_api "更新菜单项" "PUT" "/api/menus/1" \
    '{"title":"首页 - 已更新","url":"/","parentId":null,"order":1,"active":true}' \
    "200"
echo ""

# 6. 测试文章管理
echo "6. 测试文章管理功能"
echo "------------------------------------------"
test_api "获取文章列表" "GET" "/api/articles?page=1" "" "200"
test_api "获取公司新闻" "GET" "/api/articles?category=%E5%85%AC%E5%8F%B8%E6%96%B0%E9%97%BB&status=published" "" "200"
test_api "获取行业资讯" "GET" "/api/articles?category=%E8%A1%8C%E4%B8%9A%E8%B5%84%E8%AE%AF&status=published" "" "200"

# 创建测试文章
test_api "创建测试文章" "POST" "/api/articles" \
    '{"title":"测试文章","summary":"测试摘要","content":"<p>测试内容</p>","category":"公司新闻","author":"测试员","status":"published"}' \
    "201"
echo ""

# 7. 测试图片上传
echo "7. 测试图片上传功能"
echo "------------------------------------------"
# 创建测试图片文件
echo "test image" > /tmp/test-upload.png

echo -n "测试：上传图片 ... "
upload_response=$(curl -s -w "\n%{http_code}" -X POST "$API_URL/api/images/upload" \
    -H "Authorization: Bearer $TOKEN" \
    -F "image=@/tmp/test-upload.png" \
    -F "category=test")
upload_code=$(echo "$upload_response" | tail -n1)
upload_body=$(echo "$upload_response" | sed '$d')

if [ "$upload_code" == "201" ]; then
    echo -e "${GREEN}✓ 通过${NC} (状态码：$upload_code)"
else
    echo -e "${RED}✗ 失败${NC} (期望：201, 实际：$upload_code)"
    echo "响应：$upload_body"
fi

test_api "获取图片列表" "GET" "/api/images?page=1" "" "200"

# 清理测试文件
rm -f /tmp/test-upload.png
echo ""

# 8. 测试轮播图管理
echo "8. 测试轮播图管理功能"
echo "------------------------------------------"
test_api "获取轮播图列表" "GET" "/api/banners" "" "200"
test_api "创建轮播图" "POST" "/api/banners" \
    '{"title":"测试轮播图","imageUrl":"/uploads/test.png","linkUrl":"/test","order":99,"active":true}' \
    "201"
echo ""

# 9. 测试用户管理
echo "9. 测试用户管理功能"
echo "------------------------------------------"
test_api "获取用户列表" "GET" "/api/users" "" "200"
echo ""

# 10. 测试评论管理
echo "10. 测试评论管理功能"
echo "------------------------------------------"
test_api "获取评论列表" "GET" "/api/comments" "" "200"
echo ""

# 11. 测试业务板块页面
echo "11. 测试业务板块管理"
echo "------------------------------------------"
test_api "获取边缘计算页面" "GET" "/api/pages/edge-computing" "" "200"
test_api "获取支付金融页面" "GET" "/api/pages/payment-finance" "" "200"
test_api "获取电商业务页面" "GET" "/api/pages/ecommerce" "" "200"
echo ""

# 12. 测试新闻动态列表页
echo "12. 测试新闻动态列表页"
echo "------------------------------------------"
test_api "获取新闻列表页" "GET" "/api/pages/news" "" "200"
echo ""

# 13. 测试商品管理功能
echo "13. 测试商品管理功能"
echo "------------------------------------------"
test_api "获取商品列表" "GET" "/api/shop/products" "" "200"
echo ""

# 14. 测试订单管理功能
echo "14. 测试订单管理功能"
echo "------------------------------------------"
test_api "获取订单列表" "GET" "/api/orders/admin/orders" "" "200"
echo ""

# 清理测试数据
echo "15. 清理测试数据"
echo "------------------------------------------"
echo -n "删除测试页面 ... "
curl -s -X DELETE "$API_URL/api/pages/999" \
    -H "Authorization: Bearer $TOKEN" > /dev/null
echo -e "${GREEN}✓ 完成${NC}"

echo -n "删除测试菜单 ... "
curl -s -X DELETE "$API_URL/api/menus/999" \
    -H "Authorization: Bearer $TOKEN" > /dev/null
echo -e "${GREEN}✓ 完成${NC}"
echo ""

# 测试总结
echo "=========================================="
echo "测试完成！"
echo "=========================================="
echo ""
echo "测试范围："
echo "  ✓ 用户认证"
echo "  ✓ 页面管理（首页、关于我们、联系我们、业务板块）"
echo "  ✓ 页脚配置"
echo "  ✓ 站点配置"
echo "  ✓ 菜单管理"
echo "  ✓ 文章管理（公司新闻、行业资讯）"
echo "  ✓ 图片上传"
echo "  ✓ 轮播图管理"
echo "  ✓ 用户管理"
echo "  ✓ 评论管理"
echo "  ✓ 商品管理"
echo "  ✓ 订单管理"
echo ""
echo "访问地址："
echo "  前台：http://localhost:5173"
echo "  后台：http://localhost:5173/admin/login"
echo "  账号：admin@example.com / admin123456"
echo ""
