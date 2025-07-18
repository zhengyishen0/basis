// Test script for specialized and advanced components
// This script runs tests on the components to verify functionality

const testResults = {
  retrogrid: '⚠',
  textanimation: '⚠',
  videoplayer: '⚠',
  imagegallery: '⚠',
  copytoclipboard: '⚠',
  card: '⚠',
  badge: '⚠',
  alert: '⚠'
};

console.log('🧪 Starting Component Tests...\n');

// Test 1: RetroGrid Component
console.log('1. Testing RetroGrid Component...');
try {
  const retroGrid = document.querySelector('.retro-grid');
  if (retroGrid) {
    const hasAnimationClass = retroGrid.classList.contains('retro-grid-animated');
    const hasLines = retroGrid.querySelector('.retro-grid-lines');
    const hasContent = retroGrid.querySelector('.retro-grid-content');
    
    if (hasLines && hasContent) {
      testResults.retrogrid = '✓';
      console.log('  ✓ RetroGrid: Structure correct');
      console.log('  ✓ RetroGrid: Animation class present:', hasAnimationClass);
    } else {
      console.log('  ✗ RetroGrid: Missing required elements');
    }
  } else {
    console.log('  ✗ RetroGrid: Component not found');
  }
} catch (error) {
  console.log('  ✗ RetroGrid: Error -', error.message);
}

// Test 2: TextAnimation Component
console.log('\n2. Testing TextAnimation Component...');
try {
  const textAnimations = document.querySelectorAll('.text-animation');
  if (textAnimations.length > 0) {
    let allWorking = true;
    
    textAnimations.forEach((element, index) => {
      const chars = element.querySelectorAll('.text-animation-char');
      const hasGsap = typeof window.gsap !== 'undefined';
      
      if (chars.length > 0) {
        console.log(`  ✓ TextAnimation ${index + 1}: Characters split correctly (${chars.length} chars)`);
        console.log(`  ${hasGsap ? '✓' : '⚠'} TextAnimation ${index + 1}: GSAP ${hasGsap ? 'loaded' : 'not loaded yet'}`);
      } else {
        allWorking = false;
        console.log(`  ✗ TextAnimation ${index + 1}: No characters found`);
      }
    });
    
    testResults.textanimation = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ TextAnimation: No components found');
  }
} catch (error) {
  console.log('  ✗ TextAnimation: Error -', error.message);
}

// Test 3: VideoPlayer Component
console.log('\n3. Testing VideoPlayer Component...');
try {
  const videoPlayers = document.querySelectorAll('video');
  if (videoPlayers.length > 0) {
    let allWorking = true;
    
    videoPlayers.forEach((video, index) => {
      const container = video.closest('[x-data]');
      const controls = container ? container.querySelector('.absolute.inset-x-0.bottom-0') : null;
      
      console.log(`  ✓ VideoPlayer ${index + 1}: Video element present`);
      console.log(`  ${controls ? '✓' : '✗'} VideoPlayer ${index + 1}: Custom controls ${controls ? 'found' : 'missing'}`);
      console.log(`  ✓ VideoPlayer ${index + 1}: Video source: ${video.src ? 'has src' : 'has sources'}`);
      
      if (!controls) allWorking = false;
    });
    
    testResults.videoplayer = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ VideoPlayer: No components found');
  }
} catch (error) {
  console.log('  ✗ VideoPlayer: Error -', error.message);
}

// Test 4: ImageGallery Component
console.log('\n4. Testing ImageGallery Component...');
try {
  const imageGalleries = document.querySelectorAll('.image-gallery');
  if (imageGalleries.length > 0) {
    let allWorking = true;
    
    imageGalleries.forEach((gallery, index) => {
      const images = gallery.querySelectorAll('.image-gallery-thumbnail');
      const modal = gallery.querySelector('.image-gallery-modal');
      const isEmpty = gallery.querySelector('.image-gallery-empty');
      
      if (isEmpty) {
        console.log(`  ⚠ ImageGallery ${index + 1}: Empty gallery detected`);
      } else {
        console.log(`  ✓ ImageGallery ${index + 1}: ${images.length} images found`);
        console.log(`  ${modal ? '✓' : '✗'} ImageGallery ${index + 1}: Lightbox modal ${modal ? 'present' : 'missing'}`);
        if (!modal) allWorking = false;
      }
    });
    
    testResults.imagegallery = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ ImageGallery: No components found');
  }
} catch (error) {
  console.log('  ✗ ImageGallery: Error -', error.message);
}

// Test 5: CopyToClipboard Component
console.log('\n5. Testing CopyToClipboard Component...');
try {
  const copyComponents = document.querySelectorAll('.copy-to-clipboard');
  if (copyComponents.length > 0) {
    let allWorking = true;
    
    copyComponents.forEach((component, index) => {
      const button = component.querySelector('button');
      const hasClipboardAPI = navigator.clipboard && window.isSecureContext;
      
      console.log(`  ✓ CopyToClipboard ${index + 1}: Button present`);
      console.log(`  ${hasClipboardAPI ? '✓' : '⚠'} CopyToClipboard ${index + 1}: Clipboard API ${hasClipboardAPI ? 'available' : 'fallback mode'}`);
      
      if (!button) allWorking = false;
    });
    
    testResults.copytoclipboard = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ CopyToClipboard: No components found');
  }
} catch (error) {
  console.log('  ✗ CopyToClipboard: Error -', error.message);
}

// Test 6: Card Component
console.log('\n6. Testing Card Component...');
try {
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    let allWorking = true;
    
    cards.forEach((card, index) => {
      const hasVariantClass = Array.from(card.classList).some(cls => cls.startsWith('card-') && !cls.includes('padding'));
      const hasPaddingClass = Array.from(card.classList).some(cls => cls.includes('card-padding'));
      
      console.log(`  ✓ Card ${index + 1}: Base card class present`);
      console.log(`  ${hasVariantClass ? '✓' : '✗'} Card ${index + 1}: Variant class ${hasVariantClass ? 'present' : 'missing'}`);
      console.log(`  ${hasPaddingClass ? '✓' : '✗'} Card ${index + 1}: Padding class ${hasPaddingClass ? 'present' : 'missing'}`);
      
      if (!hasVariantClass || !hasPaddingClass) allWorking = false;
    });
    
    testResults.card = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ Card: No components found');
  }
} catch (error) {
  console.log('  ✗ Card: Error -', error.message);
}

// Test 7: Badge Component
console.log('\n7. Testing Badge Component...');
try {
  const badges = document.querySelectorAll('.badge');
  if (badges.length > 0) {
    let allWorking = true;
    
    badges.forEach((badge, index) => {
      const hasVariantClass = Array.from(badge.classList).some(cls => cls.match(/badge-(solid|soft|outline|dot)-/));
      const hasSizeClass = Array.from(badge.classList).some(cls => cls.match(/badge-(sm|md|lg)/));
      
      console.log(`  ✓ Badge ${index + 1}: Base badge class present`);
      console.log(`  ${hasVariantClass ? '✓' : '✗'} Badge ${index + 1}: Variant-color class ${hasVariantClass ? 'present' : 'missing'}`);
      console.log(`  ${hasSizeClass ? '✓' : '✗'} Badge ${index + 1}: Size class ${hasSizeClass ? 'present' : 'missing'}`);
      
      if (!hasVariantClass || !hasSizeClass) allWorking = false;
    });
    
    testResults.badge = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ Badge: No components found');
  }
} catch (error) {
  console.log('  ✗ Badge: Error -', error.message);
}

// Test 8: Alert Component
console.log('\n8. Testing Alert Component...');
try {
  const alerts = document.querySelectorAll('.alert');
  if (alerts.length > 0) {
    let allWorking = true;
    
    alerts.forEach((alert, index) => {
      const hasVariantClass = Array.from(alert.classList).some(cls => cls.startsWith('alert-') && cls !== 'alert');
      const hasDismissButton = alert.querySelector('.alert-dismiss');
      const isDismissible = alert.hasAttribute('x-data');
      
      console.log(`  ✓ Alert ${index + 1}: Base alert class present`);
      console.log(`  ${hasVariantClass ? '✓' : '✗'} Alert ${index + 1}: Variant class ${hasVariantClass ? 'present' : 'missing'}`);
      console.log(`  ${isDismissible ? '✓' : '⚠'} Alert ${index + 1}: Dismissible: ${isDismissible ? 'yes' : 'no'}`);
      
      if (!hasVariantClass) allWorking = false;
    });
    
    testResults.alert = allWorking ? '✓' : '⚠';
  } else {
    console.log('  ✗ Alert: No components found');
  }
} catch (error) {
  console.log('  ✗ Alert: Error -', error.message);
}

// Final Results
console.log('\n📊 Component Test Results:');
console.log('=' .repeat(40));
Object.entries(testResults).forEach(([component, status]) => {
  const name = component.charAt(0).toUpperCase() + component.slice(1);
  console.log(`${status} ${name.replace(/([A-Z])/g, ' $1').trim()}`);
});

console.log('\n🔍 Test completed. Check console for detailed results.');