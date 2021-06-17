import Main from './components/Main';
import './style.css';

function init() {
    const container = document.getElementById('root');
    fetch('/config')
    .then(response => response.json())
    .then(size => {
        fetch('/paths')
        .then(response => response.json())
        .then(path => {
            let paths = {
                path1: [],
                path2: [],
                path3: []
            }
            path.forEach((i, index)=>{
                i.path.forEach( j => {
                    paths["path"+(index+1)].push(j[0]);
                })
            })
            console.log(paths);
            new Main(container, size.size, paths);
        })
    });
}
init();
