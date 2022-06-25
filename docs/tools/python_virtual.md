# Python Virtual environment     

Imagining `CLASSPATH` in Java language.    
Python has the similar environment variable called `PYTHONPATH`.      
However, usually using other ways to isloate a developement environment dependency and library reference.     

> Introducing an example in Python basic concepts without involving other platforms such as `Anaconda`.     

This is the steps I use for creating python virtual environment.
( Like myself, you may not want to get python system environment gets dirty.    
And we want to use seperate virtual environment with different versions of libraries as needed. )    

1. Create virtual environment directory. Use any of the following thtree commands.     
   Then it will create file structures with the directory.   

```
python3 -m venv .     ## create virtual environment in current directory.
python3 -m venv venv_test/ ## create virtual environment specifying a directory. I prefer to use this.
```

2. Activate the environment. It's kind of applying profile on the current terminal.    
   You will see the prefix (Virtual env name) is added in the terminal prompt.    
```
jsmacpro15touch:bin kr050496$ source venv_test/bin/activate       
(venv_test) jsmacpro15touch:bin kr050496$     
```

3. So I see python command is from this virtual environment directory.    

```
(venv_test) jsmacpro15touch:bin kr050496$ which python3
/Users/kr050496/bin/venv_test/bin/python3
```

4. Check library list in this clean environment, you may see two like below.    

```
(venv_test) jsmacpro15touch:bin kr050496$ pip list
Package    Version
---------- -------
pip        10.0.1 
setuptools 39.0.1 
You are using pip version 10.0.1, however version 19.2.2 is available.
You should consider upgrading via the 'pip install --upgrade pip' command.
```

5. Install necessary libraries.    
   Here, installing the most popular machine learning library 'pandas'.    
   Thenm, the library will be installed in this virtual environment directory only.    

```
(venv_test) jsmacpro15touch:bin kr050496$ pip3 install pandas

 You may also install jupyter notebook library and so on with the same way.

(venv_test) jsmacpro15touch:bin kr050496$ pip3 install jupyter
```

6. List up all libraries 
```
(venv_test) jsmacpro15touch:bin kr050496$ pip freeze
```

This is usually used to export libraries list to a file so that we can reuse this in other virtual environment to install at once.

```
(venv_test) jsmacpro15touch:bin kr050496$ pip3 install -r requirements.txt
```

NOTE. Using this output file, you can install necessary libraries at once in other virtual environment project.
```
pip3 install -r requirements.txt
```

7. So you create a python files in this directory by editor, Visual studio code or PyCharm.    
   When creating a project in Pycharm, it does above steps automatically.    
   However, if you do above manually under PyCharm projects directory, PyCharm will regognize it by opening the directory from Pycharm.   


My airectory example.      
```
jsmacpro15touch:PycharmProjects kr050496$ pwd
/Users/kr050496/PycharmProjects
jsmacpro15touch:PycharmProjects kr050496$ ls
ML_anaconda    db2tool        py3_sys        test        testpython2    venv_test
```

8. To exit the virtual environment.

```
(venv_test) jsmacpro15touch:bin kr050496$ deactivate
jsmacpro15touch:bin kr050496$ 
```



