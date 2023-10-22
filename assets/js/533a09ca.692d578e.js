"use strict";(self.webpackChunkai=self.webpackChunkai||[]).push([[4607],{3905:function(e,t,r){r.d(t,{Zo:function(){return l},kt:function(){return f}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),c=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},l=function(e){var t=c(e.components);return n.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},g=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,l=s(e,["components","mdxType","originalType","parentName"]),g=c(r),f=a,b=g["".concat(u,".").concat(f)]||g[f]||p[f]||o;return r?n.createElement(b,i(i({ref:t},l),{},{components:r})):n.createElement(b,i({ref:t},l))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=g;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}g.displayName="MDXCreateElement"},621:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return u},metadata:function(){return c},toc:function(){return l},default:function(){return g}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],s={},u="aaa",c={unversionedId:"tutorial-basics/create-a-blog-post",id:"tutorial-basics/create-a-blog-post",isDocsHomePage:!1,title:"aaa",description:"Docusaurus creates a page for each blog post, but also a blog index page, a tag system, an RSS feed...",source:"@site/docs/tutorial-basics/create-a-blog-post.md",sourceDirName:"tutorial-basics",slug:"/tutorial-basics/create-a-blog-post",permalink:"/ai/docs/tutorial-basics/create-a-blog-post",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/tutorial-basics/create-a-blog-post.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"dfdfd",permalink:"/ai/docs/tutorial-basics/congratulations"},next:{title:"bbb",permalink:"/ai/docs/tutorial-basics/create-a-document"}},l=[{value:"Create your first Post",id:"create-your-first-post",children:[]}],p={toc:l};function g(e){var t=e.components,r=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"aaa"},"aaa"),(0,o.kt)("p",null,"Docusaurus creates a ",(0,o.kt)("strong",{parentName:"p"},"page for each blog post"),", but also a ",(0,o.kt)("strong",{parentName:"p"},"blog index page"),", a ",(0,o.kt)("strong",{parentName:"p"},"tag system"),", an ",(0,o.kt)("strong",{parentName:"p"},"RSS")," feed..."),(0,o.kt)("h2",{id:"create-your-first-post"},"Create your first Post"),(0,o.kt)("p",null,"Create a file at ",(0,o.kt)("inlineCode",{parentName:"p"},"blog/2021-02-28-greetings.md"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-md",metastring:'title="blog/2021-02-28-greetings.md"',title:'"blog/2021-02-28-greetings.md"'},"---\nslug: greetings\ntitle: Greetings!\nauthor: Steven Hansel\nauthor_title: Docusaurus Contributor\nauthor_url: https://github.com/ShinteiMai\nauthor_image_url: https://github.com/ShinteiMai.png\ntags: [greetings]\n---\n\nCongratulations, you have made your first post!\n\nFeel free to play around and edit this post as much you like.\n")),(0,o.kt)("p",null,"A new blog post is now available at ",(0,o.kt)("inlineCode",{parentName:"p"},"http://localhost:3000/blog/greetings"),"."))}g.isMDXComponent=!0}}]);