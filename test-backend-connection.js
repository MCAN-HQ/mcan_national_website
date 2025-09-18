const axios = require('axios');

async function testBackendConnection() {
  const baseUrl = 'https://mcan-national-website.onrender.com/api/v1';
  
  console.log('Testing backend connection...');
  console.log(`Backend URL: ${baseUrl}`);
  
  try {
    // Test basic connectivity
    console.log('\n1. Testing basic connectivity...');
    const response = await axios.get(`${baseUrl}/auth/test`, { timeout: 10000 });
    console.log('✅ Backend is responding');
    console.log('Response:', response.data);
  } catch (error) {
    console.log('❌ Backend connectivity test failed');
    if (error.code === 'ECONNABORTED') {
      console.log('Error: Request timeout - backend might be starting up');
    } else if (error.response) {
      console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }

  try {
    // Test creating SUPER_ADMIN
    console.log('\n2. Testing SUPER_ADMIN creation...');
    const createResponse = await axios.post(`${baseUrl}/create-super-admin`, {}, { timeout: 10000 });
    console.log('✅ SUPER_ADMIN creation successful');
    console.log('Response:', createResponse.data);
  } catch (error) {
    console.log('❌ SUPER_ADMIN creation failed');
    if (error.code === 'ECONNABORTED') {
      console.log('Error: Request timeout - backend might be starting up');
    } else if (error.response) {
      console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }

  try {
    // Test login with admin credentials
    console.log('\n3. Testing admin login...');
    const loginResponse = await axios.post(`${baseUrl}/auth/login`, {
      email: 'admin@mcan.org.ng',
      password: 'Admin123!'
    }, { timeout: 10000 });
    console.log('✅ Admin login successful');
    console.log('Response:', loginResponse.data);
  } catch (error) {
    console.log('❌ Admin login failed');
    if (error.code === 'ECONNABORTED') {
      console.log('Error: Request timeout - backend might be starting up');
    } else if (error.response) {
      console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
      console.log('Response:', error.response.data);
    } else {
      console.log('Error:', error.message);
    }
  }
}

testBackendConnection();
