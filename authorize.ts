import { sessions } from './lib/sessions';

(async ()=>{

    const name = process.argv[2];
    if(!name){
        console.error('You must input a device name!');
        process.exit(1);
    }
    
    const deviceId = process.argv[3];
    if(!deviceId){
        console.error('You must input a device ID!');
        process.exit(1);
    }
    
    console.log('Authorizing device...');
    await sessions.create(deviceId, name);
    console.log('Done!');
    process.exit(0);

})();