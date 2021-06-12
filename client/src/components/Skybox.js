import {TextureLoader, Mesh,MeshBasicMaterial,BoxGeometry} from 'three'

export default class Skybox{
    constructor(){
        let materialArray = [];
        let texture_ft = new TextureLoader().load( 'arid2_ft.jpg');
        let texture_bk = new TextureLoader().load( 'arid2_bk.jpg');
        let texture_up = new TextureLoader().load( 'arid2_up.jpg');
        let texture_dn = new TextureLoader().load( 'arid2_dn.jpg');
        let texture_rt = new TextureLoader().load( 'arid2_rt.jpg');
        let texture_lf = new TextureLoader().load( 'arid2_lf.jpg');
          
        materialArray.push(new MeshBasicMaterial( { map: texture_ft }));
        materialArray.push(new MeshBasicMaterial( { map: texture_bk }));
        materialArray.push(new MeshBasicMaterial( { map: texture_up }));
        materialArray.push(new MeshBasicMaterial( { map: texture_dn }));
        materialArray.push(new MeshBasicMaterial( { map: texture_rt }));
        materialArray.push(new MeshBasicMaterial( { map: texture_lf }));
    }
}