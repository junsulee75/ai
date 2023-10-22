"use strict";(self.webpackChunkai=self.webpackChunkai||[]).push([[1516],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return y}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(n),y=o,v=m["".concat(p,".").concat(y)]||m[y]||u[y]||a;return n?r.createElement(v,i(i({ref:t},c),{},{components:n})):r.createElement(v,i({ref:t},c))}));function y(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},3609:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return p},metadata:function(){return s},toc:function(){return c},default:function(){return m}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={},p="Python Virtual environment",s={unversionedId:"tools/python_virtual",id:"tools/python_virtual",isDocsHomePage:!1,title:"Python Virtual environment",description:"Imagining CLASSPATH in Java language.",source:"@site/docs/tools/python_virtual.md",sourceDirName:"tools",slug:"/tools/python_virtual",permalink:"/ai/docs/tools/python_virtual",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/tools/python_virtual.md",version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"README",permalink:"/ai/docs/intro"},next:{title:"db2u oltp resources on CP4D",permalink:"/ai/docs/c4pd/underlying_cp4d"}},c=[],u={toc:c};function m(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"python-virtual-environment"},"Python Virtual environment"),(0,a.kt)("p",null,"Imagining ",(0,a.kt)("inlineCode",{parentName:"p"},"CLASSPATH")," in Java language.",(0,a.kt)("br",{parentName:"p"}),"\n","Python has the similar environment variable called ",(0,a.kt)("inlineCode",{parentName:"p"},"PYTHONPATH"),".",(0,a.kt)("br",{parentName:"p"}),"\n","However, usually using other ways to isloate a developement environment dependency and library reference.     "),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"Introducing an example in Python basic concepts without involving other platforms such as ",(0,a.kt)("inlineCode",{parentName:"p"},"Anaconda"),".     ")),(0,a.kt)("p",null,"This is the steps I use for creating python virtual environment.\n( Like myself, you may not want to get python system environment gets dirty.",(0,a.kt)("br",{parentName:"p"}),"\n","And we want to use seperate virtual environment with different versions of libraries as needed. )    "),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"Create virtual environment directory. Use any of the following thtree commands.",(0,a.kt)("br",{parentName:"li"}),"Then it will create file structures with the directory.   ")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"python3 -m venv .     ## create virtual environment in current directory.\npython3 -m venv venv_test/ ## create virtual environment specifying a directory. I prefer to use this.\n")),(0,a.kt)("ol",{start:2},(0,a.kt)("li",{parentName:"ol"},"Activate the environment. It's kind of applying profile on the current terminal.",(0,a.kt)("br",{parentName:"li"}),"You will see the prefix (Virtual env name) is added in the terminal prompt.    ")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"jsmacpro15touch:bin kr050496$ source venv_test/bin/activate       \n(venv_test) jsmacpro15touch:bin kr050496$     \n")),(0,a.kt)("ol",{start:3},(0,a.kt)("li",{parentName:"ol"},"So I see python command is from this virtual environment directory.    ")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(venv_test) jsmacpro15touch:bin kr050496$ which python3\n/Users/kr050496/bin/venv_test/bin/python3\n")),(0,a.kt)("ol",{start:4},(0,a.kt)("li",{parentName:"ol"},"Check library list in this clean environment, you may see two like below.    ")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(venv_test) jsmacpro15touch:bin kr050496$ pip list\nPackage    Version\n---------- -------\npip        10.0.1 \nsetuptools 39.0.1 \nYou are using pip version 10.0.1, however version 19.2.2 is available.\nYou should consider upgrading via the 'pip install --upgrade pip' command.\n")),(0,a.kt)("ol",{start:5},(0,a.kt)("li",{parentName:"ol"},"Install necessary libraries.",(0,a.kt)("br",{parentName:"li"}),"Here, installing the most popular machine learning library 'pandas'.",(0,a.kt)("br",{parentName:"li"}),"Thenm, the library will be installed in this virtual environment directory only.    ")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(venv_test) jsmacpro15touch:bin kr050496$ pip3 install pandas\n\n You may also install jupyter notebook library and so on with the same way.\n\n(venv_test) jsmacpro15touch:bin kr050496$ pip3 install jupyter\n")),(0,a.kt)("ol",{start:6},(0,a.kt)("li",{parentName:"ol"},"List up all libraries ")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(venv_test) jsmacpro15touch:bin kr050496$ pip freeze\n")),(0,a.kt)("p",null,"This is usually used to export libraries list to a file so that we can reuse this in other virtual environment to install at once."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(venv_test) jsmacpro15touch:bin kr050496$ pip3 install -r requirements.txt\n")),(0,a.kt)("p",null,"NOTE. Using this output file, you can install necessary libraries at once in other virtual environment project."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"pip3 install -r requirements.txt\n")),(0,a.kt)("ol",{start:7},(0,a.kt)("li",{parentName:"ol"},"So you create a python files in this directory by editor, Visual studio code or PyCharm.",(0,a.kt)("br",{parentName:"li"}),"When creating a project in Pycharm, it does above steps automatically.",(0,a.kt)("br",{parentName:"li"}),"However, if you do above manually under PyCharm projects directory, PyCharm will regognize it by opening the directory from Pycharm.   ")),(0,a.kt)("p",null,"My airectory example.      "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"jsmacpro15touch:PycharmProjects kr050496$ pwd\n/Users/kr050496/PycharmProjects\njsmacpro15touch:PycharmProjects kr050496$ ls\nML_anaconda    db2tool        py3_sys        test        testpython2    venv_test\n")),(0,a.kt)("ol",{start:8},(0,a.kt)("li",{parentName:"ol"},"To exit the virtual environment.")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre"},"(venv_test) jsmacpro15touch:bin kr050496$ deactivate\njsmacpro15touch:bin kr050496$ \n")))}m.isMDXComponent=!0}}]);