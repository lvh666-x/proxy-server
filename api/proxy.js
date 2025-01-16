const fetch = require('node-fetch');

module.exports = async (req, res) => {
    try {
        const targetUrl = 'https://cmms.xmjt.g2b.com.cn/cmms-sol/d985c6ed68e2476285812042b16413c8/sol_videoLiveLst.xdo?rows=20&page=1&personid=d480e601e5b446a688c47ba462f54d7e&sign=NmVhNWVlZjViM2ZiYzc2ZTk1OTdkNDg3MDk5YzlhMTM&title&liveType=1';

        // 检查是否为 POST 请求
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed' });
        }

        // 转发请求到目标 API
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                'Content-Type': req.headers['content-type'] || 'application/json'
            },
            body: req.body ? JSON.stringify(req.body) : null // 防止空 body
        });

        // 获取目标 API 返回的数据
        const data = await response.json();

        // 返回目标 API 响应
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy Error:', error.message);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = async (req, res) => {
    try {
        // 测试基本功能
        res.status(200).json({ message: 'Proxy server is running!' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

