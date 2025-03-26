#!/bin/bash

# 设置基础 URL
BASE_URL="http://localhost:4000/api"
TOKEN=""

# 设置已知的游戏 ID
GAME_ID="67e34e575397ff842e98478f"  # Space Explorer 游戏的 ID

# 颜色代码
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

echo "Starting API Tests..."
echo "===================="

# 1. 认证测试
echo -e "\n${GREEN}Testing Authentication APIs${NC}"

# 注册新用户
echo -e "\nRegistering new user..."
REGISTER_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testadmin2",
    "email": "admin2@example.com",
    "password": "password123"
  }')
echo $REGISTER_RESPONSE | jq '.'

# 用户登录
echo -e "\nLogging in..."
LOGIN_RESPONSE=$(curl -s -X POST "$BASE_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin2@example.com",
    "password": "password123"
  }')
echo $LOGIN_RESPONSE | jq '.'

# 提取 token
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')

# 2. 游戏管理测试
echo -e "\n${GREEN}Testing Game Management APIs${NC}"

# 创建游戏
echo -e "\nCreating new game..."
GAME_RESPONSE=$(curl -s -X POST "$BASE_URL/games" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Test Game",
    "description": "A test game",
    "type": "iframe",
    "url": "https://example.com/game",
    "category": "action",
    "tags": ["test", "action"],
    "config": {
      "width": 800,
      "height": 600,
      "allowFullscreen": true
    }
  }')
echo $GAME_RESPONSE | jq '.'

# 提取游戏 ID
GAME_ID=$(echo $GAME_RESPONSE | jq -r '.data.game._id')

# 获取游戏列表
echo -e "\nGetting game list..."
curl -s "$BASE_URL/games" | jq '.'

# 获取单个游戏
echo -e "\nGetting single game..."
curl -s "$BASE_URL/games/$GAME_ID" | jq '.'

# 3. 评论系统测试
echo -e "\n${GREEN}Testing Comment System APIs${NC}"

# 创建评论
echo -e "\nCreating comment..."
COMMENT_RESPONSE=$(curl -s -X POST "$BASE_URL/games/$GAME_ID/comments" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "content": "This is a test comment",
    "rating": 5
  }')
echo $COMMENT_RESPONSE | jq '.'

# 获取游戏评论
echo -e "\nGetting game comments..."
curl -s "$BASE_URL/games/$GAME_ID/comments" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 4. 收藏功能测试
echo -e "\n${GREEN}Testing Favorites APIs${NC}"

# 添加到收藏
echo -e "\nAdding game to favorites..."
curl -s -X POST "$BASE_URL/users/favorites/$GAME_ID" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 获取收藏列表
echo -e "\nGetting favorites list..."
curl -s "$BASE_URL/users/favorites" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 检查是否收藏
echo -e "\nChecking if game is favorited..."
curl -s "$BASE_URL/users/favorites/$GAME_ID/check" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 5. 统计功能测试
echo -e "\n${GREEN}Testing Statistics APIs${NC}"

# 记录游戏游玩
echo -e "\nRecording game play..."
curl -s -X POST "$BASE_URL/stats/games/$GAME_ID/play" \
  -H "Authorization: Bearer $TOKEN" | jq '.'

# 获取游戏统计
echo -e "\nGetting game stats..."
curl -s "$BASE_URL/stats/games/$GAME_ID" | jq '.'

# 获取热门游戏
echo -e "\nGetting popular games..."
curl -s "$BASE_URL/stats/games/popular?type=plays&limit=5" | jq '.'

# 获取总体统计
echo -e "\nGetting overall stats..."
curl -s "$BASE_URL/stats/overall" | jq '.'

# 获取分类统计
echo -e "\nGetting category stats..."
curl -s "$BASE_URL/stats/categories" | jq '.'

echo -e "\n${GREEN}API Tests Completed${NC}" 