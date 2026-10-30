// 引入全局配置或基准路径（如果有的话）
const BASE_URL = 'http://localhost:8080'; // 请替换为你的后端实际接口地址

/**
 * 通用请求封装函数
 */
function request<T>(options: {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  data?: any;
  header?: any;
}): Promise<T> {
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'Content-Type': 'application/json',
        // 'Authorization': uni.getStorageSync('token') || '', // 如果需要 Token 认证可以在这里加
        ...(options.header || {})
      },
      success: (res: any) => {
        // 根据你后端的返回结构进行调整（例如 res.data.code === 200）
        if (res.statusCode === 200) {
          resolve(res.data as T);
        } else {
          uni.showToast({
            title: res.data.message || '请求失败',
            icon: 'none'
          });
          reject(res.data);
        }
      },
      fail: (err) => {
        uni.showToast({
          title: '网络连接失败',
          icon: 'none'
        });
        reject(err);
      }
    });
  });
}

// ==================== 具体的接口定义 ====================

// 定义返回的数据类型接口（根据实际业务修改）
export interface UserInfo {
  id: number;
  name: string;
  avatar: string;
}

/**
 * 示例 1：GET 请求获取数据
 * @param params 请求参数
 */
export const getUserApi = (params?: { id: number }) => {
  return request<UserInfo>({
    url: '/users',
    method: 'GET',
    data: params
  });
};

/**
 * 示例 2：POST 请求提交数据
 * @param data 提交的数据体
 */
export const updateUserDataApi = (data: { name: string }) => {
  return request<boolean>({
    url: '/user/update',
    method: 'POST',
    data: data
  });
};