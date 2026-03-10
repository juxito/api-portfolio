(async () => {
  try {
    // load .env to mimic server startup
    await import('dotenv').then(d => d.config());
    console.log('importing express...');
    await import('express');
    console.log('express OK');

    console.log('importing cors...');
    await import('cors');
    console.log('cors OK');

    console.log('importing src/config/mongo...');
    await import('../src/config/mongo');
    console.log('mongo OK');

    console.log('importing src/models/Project...');
    await import('../src/models/Project');
    console.log('models OK');

    console.log('importing src/routes/projects...');
    await import('../src/routes/projects');
    console.log('routes OK');

    console.log('importing src/app...');
    await import('../src/app');
    console.log('app OK');
  } catch (err) {
    console.error('Import error:', err);
    process.exit(1);
  }
})();
