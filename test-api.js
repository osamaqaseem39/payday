// Test script to check API endpoints
const API_BASE = 'https://payday-new.vercel.app';

async function testEndpoints() {
  console.log('🧪 Testing API endpoints...\n');

  // Test 1: Health endpoint (no auth required)
  try {
    console.log('1️⃣ Testing health endpoint...');
    const healthResponse = await fetch(`${API_BASE}/api/health`);
    const healthData = await healthResponse.json();
    console.log('✅ Health endpoint:', healthData);
  } catch (error) {
    console.log('❌ Health endpoint failed:', error.message);
  }

  // Test 2: Test endpoint (no auth required)
  try {
    console.log('\n2️⃣ Testing test endpoint...');
    const testResponse = await fetch(`${API_BASE}/api/test`);
    const testData = await testResponse.json();
    console.log('✅ Test endpoint:', testData);
  } catch (error) {
    console.log('❌ Test endpoint failed:', error.message);
  }

  // Test 3: Auth test endpoint (no auth required)
  try {
    console.log('\n3️⃣ Testing auth test endpoint...');
    const authTestResponse = await fetch(`${API_BASE}/api/test-auth`);
    const authTestData = await authTestResponse.json();
    console.log('✅ Auth test endpoint:', authTestData);
  } catch (error) {
    console.log('❌ Auth test endpoint failed:', error.message);
  }

  // Test 4: Applications endpoint (auth required)
  try {
    console.log('\n4️⃣ Testing applications endpoint (no auth)...');
    const appsResponse = await fetch(`${API_BASE}/api/applications`);
    const appsData = await appsResponse.json();
    console.log('✅ Applications endpoint response:', appsData);
  } catch (error) {
    console.log('❌ Applications endpoint failed:', error.message);
  }

  // Test 5: Applications endpoint with invalid token
  try {
    console.log('\n5️⃣ Testing applications endpoint with invalid token...');
    const appsResponseWithToken = await fetch(`${API_BASE}/api/applications`, {
      headers: {
        'Authorization': 'Bearer invalid-token-123'
      }
    });
    const appsDataWithToken = await appsResponseWithToken.json();
    console.log('✅ Applications endpoint with invalid token:', appsDataWithToken);
  } catch (error) {
    console.log('❌ Applications endpoint with invalid token failed:', error.message);
  }

  console.log('\n🏁 Testing complete!');
}

// Run the tests
testEndpoints(); 