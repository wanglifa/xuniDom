// <div>
//     <p>
//         <span>jirengu.com</span>
//     </p>
//     <span>xiedaimala.com</span>
// </div>
let node = [
    {
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
                                text: 'jirengu.com'
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
                        text: 'xiedaimala.com'
                    }
                ]
            }
        ]
    }
]

function Vnode(tag, children, text){
    this.tag = tag;
    this.children = children;
    this.text = text;
}
Vnode.prototype.render = function(){
    if(this.tag === '#text'){
        return document.createTextNode(this.text)
    }
    let el = document.createElement(this.tag);
    this.children.forEach((childNode)=>{
        el.appendChild(childNode.render())
    })
    return el;
}
function v(tag, children, text){
    if(typeof children === 'string'){
        text = children;
        children = [];
    }
    return new Vnode(tag, children, text)
}
let nodedemo = v('div',[
    v('p',[
        v('span',[
            v('#text','jirengu.com')
        ])
    ]),
    v('span',[
        v('#text','xiedaimala.com')
    ])
])
console.log(nodedemo.render())