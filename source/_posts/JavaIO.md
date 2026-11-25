---
title: JavaIO
title_en: Java IO
date: 2019-01-22 09:47:51
tags: Java
categories: Java
---

{% zh %}
# javaIO

标签： javaIO

---

**Contents**
- [什么是IO流](#流的概念和作用)
  - [IO流的分类](#IO流的分类)
  - [字符流和字节流](#字符流和字节流)
- [文件字节、字符IO](#文件字节、字符IO)
  - [文件字节IO流](#文件字节IO流)
  - [文件字符IO流](#文件字符IO流)

---
{% endzh %}

{% en %}
# Java IO

Tags: javaIO

---

**Contents**
- [What are IO streams](#The-concept-and-role-of-streams)
  - [Types of IO streams](#Types-of-IO-streams)
  - [Character streams and byte streams](#Character-streams-and-byte-streams)
- [File byte and character IO](#File-byte-and-character-IO)
  - [File byte IO streams](#File-byte-IO-streams)
  - [File character IO streams](#File-character-IO-streams)

---
{% enden %}

<!--more-->

{% zh %}
# Java流图结构

![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/JavaIO.jpg)

# 流的概念和作用

>流是一组有顺序的，有起点和终点的字节集合，是对数据传输的总称或抽象。即数据在两设备间的传输称为流，流的本质是数据传输，根据数据传输特性将流抽象为各种类，方便更直观的进行数据操作。

## IO流的分类

 + 根据处理数据类型的不同可以分为：字符流和字节流
 + 根据数据流向不同分为：输入流和输出流

## 字符流和字节流

> 字符流的由来： 因为数据编码的不同，而有了对字符进行高效操作的流对象。本质其实就是基于字节流读取时，去查了指定的码表。 字节流和字符流的区别：
>
> + 读写单位不同：字节流以字节（8bit）为单位，字符流以字符为单位，根据码表映射字符，一次可能读多个字节。
>
> + 处理对象不同：字节流能处理所有类型的数据（如图片、avi等），而字符流只能处理字符类型的数据。
>
> + 字节流：一次读入或读出是8位二进制。
>
> + 字符流：一次读入或读出是16位二进制。
>
> **设备上的数据无论是图片或者视频，文字，它们都以二进制存储的。二进制的最终都是以一个8位为数据单元进行体现，所以计算机中的最小数据单元就是字节。意味着，字节流可以处理设备上的所有数据，所以字节流一样可以处理字符数据。**
>
> **`结论：只要是处理纯文本数据，就优先考虑使用字符流。 除此之外都使用字节流。`**
>
>
>


# 文件字节、字符IO
> Java程序可能经常需要获取磁盘上文件的有关信息或在磁盘上创建新的文件等，这就需要用到`File类`。
>
> ### 创建一个File对象的构造方法有3个：
> + File(String filename);
> + File(String directoryPath,String filename);
> + File(File dir,String filename);
>
> *filename--文件名字；directoryPath--文件路径；dir--一个目录；`使用File(String filename)创建文件时，该文件被认为与当前应用程序在同一个目录中。`*
>
### **文件的属性：**
<pre>
public String getName();            //获取文件的名字
public boolean canRead();           //判断文件是否是可读的
public boolean canWrite();          //判断文件是否可被写入
public boolean exists();            //判断文件是否存在
public long length();               //获取文件的长度（单位是字节）
public String getAbsolutePath();    //获取文件的绝对路径
public String getParent();          //获取文件的父目录
public boolean isFile();            //判断文件是否是一个普通文件，而不是目录
public boolean isDirectory();       //判断文件是否是一个目录
public boolean isHidden();          //判断文件是否是隐藏文件
public long lastModified();         //获取文件最后修改的时间（时间是从1970年午夜至文件最后修改时刻的毫秒数）
</pre>
**例子：使用上述方法获取某些文件的信息：**

```java
public class FileTest {
    public static void main(String[] args) {
        File f = new File("F:\\IDEA_code\\IOTest","newIO.txt");
        System.out.println(f.getName() + "是可读的吗：" + f.canRead());
        System.out.println(f.getName() + "的长度：" + f.length());
        System.out.println(f.getName() + "的绝对路径：" + f.getAbsolutePath());

        File newFile = new File("new.txt");
        System.out.println("在当前目录下创建新文件：" + newFile.getName());
        if (!newFile.exists()){
            try {
                newFile.createNewFile();    //如果没有new.txt则创建一个
                System.out.println("创建成功！");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### **目录：**
>
+ 创建目录
>File对象调用方法public boolean mkdir()创建一个目录，如果创建成功返回true，否则返回false（如果该目录已经存在将返回false）。
+ 列出目录中的文件
>如果File对象是一个目录，那么该对象调用下述方法列出目录下的文件和目录。
<pre>
public String[] list();             //用字符串形式返回目录下的全部文件
public File[] listFiles();          //用File对象形式返回目录下的全部文件
</pre>
>有时候需要列出目录下指定类型的文件，比如.java、.txt等扩展名的文件。可以使用File类的下述两个方法，列出指定类型的文件：
<pre>
public String[] list(FilenameFilter obj);           //该方法用字符串形式返回目录下的指定类型的所有文件
public File[] listFiles(FilenameFilter obj);        //该方法用File对象形式返回目录下的指定类型的所有文件
</pre>
>上述两个方法的参数FIlenameFilter是一个接口，该接口有个方法：
<pre>
public boolean accept(File dir,String name);
</pre>
>File对象dirFile调用list方法时，需向该方法传递一个实现FilenameFilter接口的对象，list方法执行时，参数obj不断回调接口方法accept(File dir,String name)，该方法中的参数dir为调用list的当前目录dirFile，参数name被实例化为dirFile，参数name被实例化为dirFile目录中的一个文件名，当接口方法返回true时，list方法就将名字为name的文件存放到返回的数组中。
>
**例子：列出当前目录下（应用程序所在的目录）下全部.java文件的名字：**
```java
public class DirFileTest {
    public static void main(String[] args) {
        File dirFile = new File("F:\\IDEA_code\\Singleton_pattern\\src\\com\\dell\\example\\IODemo\\FileTest");
        FileAccept fileAccept = new FileAccept();
        fileAccept.setExtendName("java");
        String fileName[] = dirFile.list(fileAccept);
        for (String name : fileName){
            System.out.println(name);
        }
    }
}
```

```java
public class FileAccept implements FilenameFilter {
    private String extendName;
    public void setExtendName(String s){
        extendName = "." + s;
    }
    @Override
    public boolean accept(File dir, String name) {  //重写接口中的方法
        return name.endsWith(extendName);
    }
}
```

## **文件字节IO流**

### 文件字节输入流
`使用输入流通常包括4个基本步骤：`
+ 设定输入流的源
+ 创建指向源的输入流
+ 让输入流读取源中的数据
+ 关闭输入流

如果对文件读取需求比较简单，那么可以使用`FileInputStream类（文件字节输入流）`，该类是InputStream类的子类（以字节为单位读取文件），该类的实例方法都是从InputStream继承来的。

+ 构造方法：

    可以使用FileInputStream类的下列构造方法创建指向文件的输入流。
    ```java
    FileInputStream(String name);
    FileInputStream(File file);
    ```
    第一个构造方法使用给定的文件名name创建FileInputStream流，第二个构造方法使用File对象创建FileInputStream流。参数name和file指定的文件称为输入流的源。

    **注意：** FileInputStream输入流打开一个到达文件的通道。当创建输入流的时候，可能会出现异常。
    ```java
    try{
        FileInputStream in = new FileInputStream("hello.txt");//创建指向文件hello.txt的输入流
    }
    catch(IOException e){
        System.out.println("File read error:" + e);
    }
    ```
    或
    ```java
    File f = new File("hello.txt"); //指定输入流的源
    try{
        FileInputStream in = new FileInputStream(f);    //创建指向源的输入流
    }
    catch(IOEception e){
        System.out.println("File read error:" + e);
    }
    ```
+ 使用输入流读取字节

    文件字节流可以调用从父类继承的`read方法`顺序地读取文件，只要不关闭流，每次调用read方法就顺序地读取文件中的其余内容，直到文件的末尾或文件字节输入流被关闭。
    
    字节输入流的read方法以字节为单位读取源中的数据。
    ```java
    int read()                              //输入流调用该方法从源中读取单个字节的数据，该方法返回字节值（0~255之间的一个整数），如果未读出字节就返回-1
    int read(byte b[])                      //输入流调用该方法从源中试图读取b.length个字节到字节数组中，返回实际读取的字节数目，如果到达文件末尾则返回-1
    int read(byte b[],int off,int len)      //输入流调用该方法从源中试图读取b.length个字节到字节数组中，返回实际读取的字节数目，如果到达文件末尾则返回-1，参数off指定从字节数组的某个位置开始存放读取的数据
    ```
+ 关闭流
    输入流都提供了关闭方法`close()`，尽管程序结束时会自动关闭所打开的流，但是当程序使用完流后，显式地关闭任何打开的流仍是一个好习惯。

**例子：使用文件字节流读文件内容：**
```java
public class InputTest {
    public static void main(String[] args) {
        int n = -1;
        byte[] a = new byte[100];
        try {
            File f = new File("F:\\IDEA_code\\Singleton_pattern\\src\\com\\dell\\example\\IODemo\\InputStreamTest\\InputTest.java");
            InputStream in = new FileInputStream(f);
            while ((n = in.read(a,0,100)) != -1){
                String s = new String(a,0,n);
                System.out.println(s);
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
### 文件字节输出流
`使用输出流通常包括4个基本步骤：`
+ 给出输出流的目的地
+ 创建指向目的地的输出流
+ 让输出流把数据写入到目的地
+ 关闭输出流

如果对文件写入需求比较简单，那么可以使用`FileOutputStream类（文件字节输出流）`，该类是OutputStream类的子类（以字节为单位写入文件），该类的实例方法都是从OutputStream继承来的。

+ 构造方法：

    可以使用FileOutputStream类的下列具有刷新功能的构造方法创建指向文件的输出流。
    ```java
    FileOutputStream(String name);
    FileOutputStream(File file);
    ```
    第一个构造方法使用给定的文件名name创建FileOutputStream流，第二个构造方法使用File对象创建FileOutputStream流。参数name和file指定的文件称为输出流的目的地。

    **注意：** FileOutputStream输出流指向的文件不存在，java就会创建该文件，如果指向的文件是已存在的文件，输入流会刷新该文件（使文件长度为0）。创建输出流可能会出现异常。
    ```java
    try{
        FileOutputStream out = new FileOutputStream("androidlab.txt");//创建指向文件androidlab.txt的输出流
    }
    catch(IOException e){
        System.out.println("File read error:" + e);
    }
    ```
    或
    ```java
    File f = new File("androidlab.txt");                //指定输出流的目的地
    try{
        FileOutputStream in = new FileOutputStream(f);    //创建指向目的地的输出流
    }
    catch(IOEception e){
        System.out.println("File read error:" + e);
    }
    ```
+ 使用输出流写字节

    文件字节流可以调用从父类继承的`write方法`顺序地写文件，只要不关闭流，每次调用write方法就顺序地写文件，直到流被关闭。
    
    字节输出流的write方法以字节为单位向目的地写入数据。
    <pre>
    void write(int n)                       //输出流调用该方法向目的地写入单个字节
    void write(byte b[])                     //输出流调用该方法向目的地写入一个字节数组
    void write(byte b[],int off,int len)     //给定字节数组中起始于偏移量off处取len个字节写入目的地
    void close()                             //关闭输出流
    </pre>
+ 关闭流
    需要注意的是，在操作系统把程序所写到输出流上的那些字节保存到磁盘上之前，有时被存放在缓冲区中，通过调用`close()`方法，可以保证操作系统把缓冲区的内容写到它的目的地。

**例子：使用文件字节流写入文件：** 使用具有刷新功能的构造方法指向文件android.txt的输出流，并向里面写入“Android”，然后再选择使用不刷新文件的构造方法指向android.txt，并向文件中追加“Lab”。
```java
public class OutputTest {
    public static void main(String[] args) {
        byte[] a = "Android".getBytes();
        byte[] b = "Lab".getBytes();
        File newFile = new File("android.txt");     //输出目的地
        try {
            OutputStream out = new FileOutputStream(newFile);   //指向目的地的输出流
            System.out.println(newFile.getName() + "的大小:" + newFile.length() + "字节");
            out.write(a);   //向目的地写入数据
            out.close();
            out = new FileOutputStream(newFile,true);   //准备向文件尾追加内容
            System.out.println(newFile.getName() + "的大小:" + newFile.length() + "字节");
            out.write(b,0,b.length);
            System.out.println(newFile.getName() + "的大小:" + newFile.length() + "字节");
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## **文件字符IO流**
文件字节输入、输出流的read和write方法使用字节数组读写数据，即以字节为单位处理数据。因此字节流不能很好地操作Unicode字符。**一个汉字在文件中占两个字节，如果使用字节流读取不当会出现“乱码”现象。**
<pre>
    字节            ------          字符
FileInputStream     ------      FileReader
FileOutputStream    ------      FileWriter
</pre>
FileReader和FileWriter分别是Reader和Writer的子类，其构造方法分别是：
<pre>
FileReader(String filename);    FileReader(File filename);
FileWriter(String filename);    FileWriter(File filename);
FileWriter(String filename,boolean append);
FileWriter(File filename,boolean append);
</pre>
**字符输入流和输出流的`read`和`write`方法使用字符数组读写数据，即以字符为基本单位处理数据。**

+ **例子：用文件字符输入、输出流将文件“NotHelloWorld.txt”中的内容尾加到“AndroidLab.txt”中**
```java
public class RWTest {
    public static void main(String[] args) {
        File sourceFile = new File("F:\\IDEA_code\\IOTest\\NotHelloWorld.txt");//读取的文件
        File targetFile = new File("F:\\IDEA_code\\IOTest\\AndroidLab.txt");//写入的文件
        char c[] = new char[100];
        try{
            Writer out = new FileWriter(targetFile,true);   //指向目的地的输出流
            Reader in = new FileReader(sourceFile);                 //指向源的输入流
            int n = -1;
            while ((n = in.read(c)) != -1){
                out.write(c,0,n);
            }
            out.flush();
            out.close();
        }catch (IOException e){
            System.out.println("Error " + e);
        }
    }
}
```
{% endzh %}

{% en %}
# Java stream class hierarchy

![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/JavaIO.jpg)

# The concept and role of streams

>A stream is an ordered collection of bytes with a beginning and an end. It is the general term, or abstraction, for data transfer: data moving between two devices is called a stream. In essence, a stream is data transfer. Based on the characteristics of the transfer, streams are abstracted into various classes so that data can be handled more intuitively.

## Types of IO streams

 + By the type of data they handle: character streams and byte streams
 + By the direction of the data: input streams and output streams

## Character streams and byte streams

> Why character streams exist: because data can be encoded in different ways, there are stream objects that work efficiently with characters. In essence, a character stream reads through a byte stream and looks up the specified character table along the way. The differences between byte streams and character streams:
>
> + Different units: byte streams read and write in bytes (8 bits). Character streams work in characters, mapped through a character table, so one read may consume several bytes.
>
> + Different data: byte streams can handle any type of data (images, avi files, etc.), while character streams can only handle character data.
>
> + Byte stream: reads or writes 8 bits of binary at a time.
>
> + Character stream: reads or writes 16 bits of binary at a time.
>
> **Whether it is an image, a video or text, data on a device is stored as binary. Binary is ultimately expressed in units of 8 bits, so the smallest unit of data in a computer is the byte. This means byte streams can handle all data on a device, including character data.**
>
> **`Conclusion: when you are handling plain text, prefer character streams. For everything else, use byte streams.`**
>
>
>


# File byte and character IO
> Java programs often need to get information about files on disk or create new files on disk. For this you use the `File class`.
>
> ### There are 3 constructors for creating a File object:
> + File(String filename);
> + File(String directoryPath,String filename);
> + File(File dir,String filename);
>
> *filename: the file name; directoryPath: the file path; dir: a directory. `When you create a file with File(String filename), the file is assumed to be in the same directory as the current application.`*
>
### **File properties:**
<pre>
public String getName();            //get the file name
public boolean canRead();           //check whether the file is readable
public boolean canWrite();          //check whether the file is writable
public boolean exists();            //check whether the file exists
public long length();               //get the file length (in bytes)
public String getAbsolutePath();    //get the absolute path of the file
public String getParent();          //get the parent directory of the file
public boolean isFile();            //check whether it is a regular file, not a directory
public boolean isDirectory();       //check whether it is a directory
public boolean isHidden();          //check whether the file is hidden
public long lastModified();         //get the last modified time (milliseconds from midnight 1970 to the last modification)
</pre>
**Example: use the methods above to get information about some files:**

```java
public class FileTest {
    public static void main(String[] args) {
        File f = new File("F:\\IDEA_code\\IOTest","newIO.txt");
        System.out.println(f.getName() + " readable: " + f.canRead());
        System.out.println(f.getName() + " length: " + f.length());
        System.out.println(f.getName() + " absolute path: " + f.getAbsolutePath());

        File newFile = new File("new.txt");
        System.out.println("Create a new file in the current directory: " + newFile.getName());
        if (!newFile.exists()){
            try {
                newFile.createNewFile();    //create new.txt if it does not exist
                System.out.println("Created!");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```

### **Directories:**
>
+ Create a directory
>A File object calls public boolean mkdir() to create a directory. It returns true on success and false otherwise (it also returns false if the directory already exists).
+ List the files in a directory
>If the File object is a directory, it can call the methods below to list the files and directories inside it.
<pre>
public String[] list();             //return all files in the directory as strings
public File[] listFiles();          //return all files in the directory as File objects
</pre>
>Sometimes you only want files of a certain type, such as files with the .java or .txt extension. You can use these two File methods to list files of a given type:
<pre>
public String[] list(FilenameFilter obj);           //return all files of the given type in the directory as strings
public File[] listFiles(FilenameFilter obj);        //return all files of the given type in the directory as File objects
</pre>
>The parameter FilenameFilter of the two methods above is an interface with one method:
<pre>
public boolean accept(File dir,String name);
</pre>
>When the File object dirFile calls list, you pass it an object that implements the FilenameFilter interface. While list runs, it keeps calling back the interface method accept(File dir,String name) on obj. The parameter dir is dirFile, the current directory list was called on, and name is set to the name of a file in the dirFile directory. Whenever the interface method returns true, list puts the file called name into the array it returns.
>
**Example: list the names of all .java files in the current directory (the directory of the application):**
```java
public class DirFileTest {
    public static void main(String[] args) {
        File dirFile = new File("F:\\IDEA_code\\Singleton_pattern\\src\\com\\dell\\example\\IODemo\\FileTest");
        FileAccept fileAccept = new FileAccept();
        fileAccept.setExtendName("java");
        String fileName[] = dirFile.list(fileAccept);
        for (String name : fileName){
            System.out.println(name);
        }
    }
}
```

```java
public class FileAccept implements FilenameFilter {
    private String extendName;
    public void setExtendName(String s){
        extendName = "." + s;
    }
    @Override
    public boolean accept(File dir, String name) {  //override the interface method
        return name.endsWith(extendName);
    }
}
```

## **File byte IO streams**

### File byte input stream
`Using an input stream usually takes 4 basic steps:`
+ Set the source of the input stream
+ Create an input stream that points to the source
+ Let the input stream read data from the source
+ Close the input stream

If your file reading needs are simple, you can use the `FileInputStream class (file byte input stream)`. It is a subclass of InputStream (it reads files byte by byte), and its instance methods are all inherited from InputStream.

+ Constructors:

    You can create an input stream that points to a file with these FileInputStream constructors.
    ```java
    FileInputStream(String name);
    FileInputStream(File file);
    ```
    The first constructor creates a FileInputStream from the given file name, and the second creates one from a File object. The file specified by name or file is called the source of the input stream.

    **Note:** a FileInputStream opens a channel to the file. Creating the input stream may throw an exception.
    ```java
    try{
        FileInputStream in = new FileInputStream("hello.txt");//create an input stream pointing to hello.txt
    }
    catch(IOException e){
        System.out.println("File read error:" + e);
    }
    ```
    or
    ```java
    File f = new File("hello.txt"); //set the source of the input stream
    try{
        FileInputStream in = new FileInputStream(f);    //create an input stream pointing to the source
    }
    catch(IOEception e){
        System.out.println("File read error:" + e);
    }
    ```
+ Read bytes with the input stream

    A file byte stream can call the `read method` inherited from its parent class to read a file in order. As long as the stream is not closed, each call to read continues with the rest of the file, until the end of the file or until the stream is closed.
    
    The read methods of a byte input stream read data from the source in bytes.
    ```java
    int read()                              //reads a single byte from the source and returns its value (an integer from 0 to 255), or -1 if no byte was read
    int read(byte b[])                      //tries to read b.length bytes from the source into the byte array, and returns the number of bytes actually read, or -1 at the end of the file
    int read(byte b[],int off,int len)      //tries to read bytes from the source into the byte array and returns the number of bytes actually read, or -1 at the end of the file; off is the position in the array where the data starts being stored
    ```
+ Close the stream
    Every input stream provides a `close()` method. Although open streams are closed automatically when the program ends, it is still good practice to explicitly close any stream once you are done with it.

**Example: read a file with a file byte stream:**
```java
public class InputTest {
    public static void main(String[] args) {
        int n = -1;
        byte[] a = new byte[100];
        try {
            File f = new File("F:\\IDEA_code\\Singleton_pattern\\src\\com\\dell\\example\\IODemo\\InputStreamTest\\InputTest.java");
            InputStream in = new FileInputStream(f);
            while ((n = in.read(a,0,100)) != -1){
                String s = new String(a,0,n);
                System.out.println(s);
            }
            in.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
### File byte output stream
`Using an output stream usually takes 4 basic steps:`
+ Specify the destination of the output stream
+ Create an output stream that points to the destination
+ Let the output stream write data to the destination
+ Close the output stream

If your file writing needs are simple, you can use the `FileOutputStream class (file byte output stream)`. It is a subclass of OutputStream (it writes files byte by byte), and its instance methods are all inherited from OutputStream.

+ Constructors:

    You can create an output stream that points to a file with these FileOutputStream constructors, which truncate the file.
    ```java
    FileOutputStream(String name);
    FileOutputStream(File file);
    ```
    The first constructor creates a FileOutputStream from the given file name, and the second creates one from a File object. The file specified by name or file is called the destination of the output stream.

    **Note:** if the file the FileOutputStream points to does not exist, Java creates it. If the file already exists, the stream truncates it (sets its length to 0). Creating the output stream may throw an exception.
    ```java
    try{
        FileOutputStream out = new FileOutputStream("androidlab.txt");//create an output stream pointing to androidlab.txt
    }
    catch(IOException e){
        System.out.println("File read error:" + e);
    }
    ```
    or
    ```java
    File f = new File("androidlab.txt");                //set the destination of the output stream
    try{
        FileOutputStream in = new FileOutputStream(f);    //create an output stream pointing to the destination
    }
    catch(IOEception e){
        System.out.println("File read error:" + e);
    }
    ```
+ Write bytes with the output stream

    A file byte stream can call the `write method` inherited from its parent class to write a file in order. As long as the stream is not closed, each call to write continues writing to the file, until the stream is closed.
    
    The write methods of a byte output stream write data to the destination in bytes.
    <pre>
    void write(int n)                       //writes a single byte to the destination
    void write(byte b[])                     //writes a byte array to the destination
    void write(byte b[],int off,int len)     //writes len bytes from the array, starting at offset off, to the destination
    void close()                             //closes the output stream
    </pre>
+ Close the stream
    Note that before the operating system saves the bytes written to the output stream to disk, they are sometimes kept in a buffer. Calling `close()` makes sure the operating system writes the buffer's contents to the destination.

**Example: write to a file with a file byte stream:** use the truncating constructor to create an output stream pointing to android.txt and write "Android" into it, then use the constructor that does not truncate the file to point to android.txt again and append "Lab".
```java
public class OutputTest {
    public static void main(String[] args) {
        byte[] a = "Android".getBytes();
        byte[] b = "Lab".getBytes();
        File newFile = new File("android.txt");     //output destination
        try {
            OutputStream out = new FileOutputStream(newFile);   //output stream pointing to the destination
            System.out.println(newFile.getName() + " size: " + newFile.length() + " bytes");
            out.write(a);   //write data to the destination
            out.close();
            out = new FileOutputStream(newFile,true);   //prepare to append to the end of the file
            System.out.println(newFile.getName() + " size: " + newFile.length() + " bytes");
            out.write(b,0,b.length);
            System.out.println(newFile.getName() + " size: " + newFile.length() + " bytes");
            out.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

## **File character IO streams**
The read and write methods of file byte input and output streams use byte arrays, so they handle data byte by byte. That is why byte streams do not handle Unicode characters well. **A Chinese character takes two bytes in a file, so reading it incorrectly with a byte stream produces garbled text.**
<pre>
    Byte            ------          Character
FileInputStream     ------      FileReader
FileOutputStream    ------      FileWriter
</pre>
FileReader and FileWriter are subclasses of Reader and Writer. Their constructors are:
<pre>
FileReader(String filename);    FileReader(File filename);
FileWriter(String filename);    FileWriter(File filename);
FileWriter(String filename,boolean append);
FileWriter(File filename,boolean append);
</pre>
**The `read` and `write` methods of character input and output streams use character arrays, so they handle data character by character.**

+ **Example: use file character input and output streams to append the contents of "NotHelloWorld.txt" to "AndroidLab.txt"**
```java
public class RWTest {
    public static void main(String[] args) {
        File sourceFile = new File("F:\\IDEA_code\\IOTest\\NotHelloWorld.txt");//file to read
        File targetFile = new File("F:\\IDEA_code\\IOTest\\AndroidLab.txt");//file to write
        char c[] = new char[100];
        try{
            Writer out = new FileWriter(targetFile,true);   //output stream pointing to the destination
            Reader in = new FileReader(sourceFile);                 //input stream pointing to the source
            int n = -1;
            while ((n = in.read(c)) != -1){
                out.write(c,0,n);
            }
            out.flush();
            out.close();
        }catch (IOException e){
            System.out.println("Error " + e);
        }
    }
}
```
{% enden %}
