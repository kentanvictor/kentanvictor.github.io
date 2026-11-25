---
title: "Java IO"
description: "Tags: javaIO Contents What are IO streams Types of IO streams Character streams and byte streams File byte and character IO File byte IO streams File character IO streams"
date: "2019-01-22T09:47:51"
tags: ["Java"]
legacy: true
hexoUrl: "/2019/01/22/JavaIO/"
---

Tags: javaIO

---

**Contents**
- [What are IO streams](#the-concept-and-role-of-streams)
  - [Types of IO streams](#types-of-io-streams)
  - [Character streams and byte streams](#character-streams-and-byte-streams)
- [File byte and character IO](#file-byte-and-character-io)
  - [File byte IO streams](#file-byte-io-streams)
  - [File character IO streams](#file-character-io-streams)

---

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
