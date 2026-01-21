// Test básico para validar la aplicación
const fs = require('fs');
const path = require('path');

console.log('🧪 Running tests for Ruleta de Almuerzos...\n');

let testsPassed = 0;
let testsFailed = 0;

// Test 1: Verificar que existen los archivos principales
function testFilesExist() {
  const files = ['index.html', 'style.css', 'script.js'];
  let allExist = true;
  
  files.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    if (fs.existsSync(filePath)) {
      console.log(`✓ File exists: ${file}`);
    } else {
      console.log(`✗ File missing: ${file}`);
      allExist = false;
    }
  });
  
  return allExist;
}

// Test 2: Verificar contenido del HTML
function testHTMLContent() {
  const htmlPath = path.join(__dirname, '..', 'index.html');
  const content = fs.readFileSync(htmlPath, 'utf8');
  
  const checks = [
    { test: content.includes('Ruleta de Almuerzos'), msg: 'HTML contains title' },
    { test: content.includes('generateBtn'), msg: 'HTML contains generate button' },
    { test: content.includes('style.css'), msg: 'HTML links to CSS' },
    { test: content.includes('script.js'), msg: 'HTML links to JavaScript' }
  ];
  
  let allPassed = true;
  checks.forEach(check => {
    if (check.test) {
      console.log(`✓ ${check.msg}`);
    } else {
      console.log(`✗ ${check.msg}`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// Test 3: Verificar que el CSS no está vacío
function testCSSNotEmpty() {
  const cssPath = path.join(__dirname, '..', 'style.css');
  const content = fs.readFileSync(cssPath, 'utf8');
  
  if (content.length > 0) {
    console.log(`✓ CSS file is not empty (${content.length} chars)`);
    return true;
  } else {
    console.log('✗ CSS file is empty');
    return false;
  }
}

// Test 4: Verificar que el JavaScript tiene funciones básicas
function testJavaScriptFunctions() {
  const jsPath = path.join(__dirname, '..', 'script.js');
  const content = fs.readFileSync(jsPath, 'utf8');
  
  const checks = [
    { test: content.includes('function') || content.includes('=>'), msg: 'JavaScript contains functions' },
    { test: content.includes('addEventListener') || content.includes('onclick'), msg: 'JavaScript has event listeners' }
  ];
  
  let allPassed = true;
  checks.forEach(check => {
    if (check.test) {
      console.log(`✓ ${check.msg}`);
    } else {
      console.log(`✗ ${check.msg}`);
      allPassed = false;
    }
  });
  
  return allPassed;
}

// Test 5: Verificar estructura de directorios
function testDirectoryStructure() {
  const requiredDirs = ['k8s', '.github'];
  let allExist = true;
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (fs.existsSync(dirPath)) {
      console.log(`✓ Directory exists: ${dir}`);
    } else {
      console.log(`✗ Directory missing: ${dir}`);
      allExist = false;
    }
  });
  
  return allExist;
}

// Ejecutar todos los tests
console.log('--- Test Suite: File Existence ---');
if (testFilesExist()) testsPassed++; else testsFailed++;

console.log('\n--- Test Suite: HTML Content ---');
if (testHTMLContent()) testsPassed++; else testsFailed++;

console.log('\n--- Test Suite: CSS Content ---');
if (testCSSNotEmpty()) testsPassed++; else testsFailed++;

console.log('\n--- Test Suite: JavaScript Content ---');
if (testJavaScriptFunctions()) testsPassed++; else testsFailed++;

console.log('\n--- Test Suite: Directory Structure ---');
if (testDirectoryStructure()) testsPassed++; else testsFailed++;

// Resumen
console.log('\n' + '='.repeat(50));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(50));

if (testsFailed > 0) {
  console.log('\n❌ Some tests failed!');
  process.exit(1);
} else {
  console.log('\n✅ All tests passed!');
  process.exit(0);
}
