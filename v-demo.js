// 使用虚拟DOM实现下面的html
// <div>
//     <p><span>xiedaimala.com</span></p>
//     <span>jirengu.com</span>
// </div> 

//我们想要得到的结构
let nodesData = {
    tag: 'div',
    children: [
        {
            tag: 'p',
            children: [
                {
                    tag: 'span',
                    children: [
                        {
                            tag: '#text',
                            text: 'xiedaimala.com'
                        }
                    ]
                }
            ]
        },
        {
            tag: 'span',
            children: [
                {
                    tag: '#text',
                    text: 'jirengu.com'
                }
            ]
        }
    ]
}

//实现
function vNode(tag, children, text){
    this.tag = tag;
    this.children = children;
    this.text = text;
}
vNode.prototype.render = function(){
    if(this.tag === '#text'){
        return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag);
    this.children.forEach((vChild)=>{
        el.appendChild(vChild.render())
    })
    return el;
}

function v(tag, children, text){
    //如果你的第二个参数是传入的是字符串的话，那就说明这个参数是text
    //比如v('#text','xiedaimale.com')这个xiedaimala.com就是text，
    //所以让text等于你的第二个参数children，而children就等于一个空的数组
    if(typeof children === 'string'){
        //这里是让第text变成第二个参数
        text = children;
        //让你的children这个参数等于一个空数组
        children = [];
    }
    return new vNode(tag, children, text)
}




//这时候下面的VNode1就是我们的虚拟DOM

// let VNode1 = v('div',[
//     v('p',[
//         v('span',[
//             v('#text','xiedaimala.com')
//         ])
//     ]),
//     v('span',[
//         v('#text','jirengu.com')
//     ])
// ])

// let VNode2 = v('div',[
//     v('p',[
//         v('span',[
//             v('#text','xiedaimala.com')
//         ])
//     ]),
//     v('span',[
//         v('#text','jirengu.com'),
//         v('#text','lifa')
//     ])
// ])

//下面的parent参数就是要比较的DOM结构，newVNode新的虚拟DOM，oldVNode旧的虚拟DOM
function patchElement(parent, newVNode, oldVNode, index=0){
    //如果旧的虚拟DOM不存在也就是说DOM结构没有更改的情况下，就执行新增操作
    if(!oldVNode){
        //直接将当前新的虚拟DOM加到父元素里 => 新增
        parent.appendChild(newVNode.render())
    }else if(!newVNode){
        //如果没有新的虚拟DOM存在，就执行删除操作，删除之前添加的虚拟DOM
        parent.removeChild(parent.childNodes[index])
    }else if(newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text){
        //如果新的虚拟DOM里的标签不等与旧的里面的标签或者文本不等于旧的里面的文本
        //就执行修改操作，将旧的虚拟DOM替换为新的
        parent.replaceChild(newVNode.render(), parent.childNodes[index])
    }else{
        for(let i = 0; i<newVNode.children.length || i<oldVNode.children.length;i++){
            patchElement(parent.childNodes[index], newVNode.children[i],oldVNode.children[i],i)
        }
    }
}
let root = document.querySelector('#root');
let VNode1 = v('div',[
    v('p',[
        v('span',[
            v('#text','jirengu.com')
        ])
    ])
])
let VNode2 = v('div',[
    v('p',[
        v('span',[
            v('#text','xiedaimala.com')
        ])
    ])
])
patchElement(root, VNode1)
// 两个虚拟DOM的children的text不一样所以将VNode1换成了VNode2，也就是在DOM里将div里的hello换成world
patchElement(root, VNode2, VNode1)


// let VNode1 = v('div',[])
// let VNode2 = v('p',[])
// patchElement(root, VNode1)
// //tag不一样所以将VNode1换成了VNode2，也就是在DOM里将div换成了p
// patchElement(root, VNode2, VNode1)




//把新的虚拟DOM(VNode1)做一个渲染，变成真实的DOM,放到parent(root)里面
//patchElement(root, VNode1)

//把上面代码添加的VNode1删除
//patchElement(root, null, VNode1)

