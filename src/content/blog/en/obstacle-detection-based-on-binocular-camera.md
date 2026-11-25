---
title: "Obstacle detection based on binocular camera"
description: "Preface: There are several related articles on the obstacle detection of binocular cameras and the obstacle detection based on OpenCV on CSDN and blog garden. However, a…"
date: "2018-10-18T20:31:23"
tags: ["Computer Vision"]
legacy: true
hexoUrl: "/2018/10/18/Obstacle detection based on binocular camera/"
---

>Preface: There are several related articles on the obstacle detection of binocular cameras and the obstacle detection based on OpenCV on CSDN and blog garden. However, a considerable part of the articles on obstacle detection tend to be theoretical, and there are few practical articles. Here, I will follow the examples I learned from the Internet to integrate and add my own understanding. I hope it can play a certain reference role for everyone in obstacle detection.

>**Special thanks: <br/>[亦轩Dhc's Blog](http://www.cnblogs.com/daihengchen/p/5686272.html)<br/>[琪其齐奇旗棋's Blog](https://blog.csdn.net/zhouqianq/article/details/78580173)<br/>[_寒潭雁影的's Blog](https://blog.csdn.net/weixinhum/article/details/78161567)**

## Now let’s get to the main topic!
### Preliminary preparation:
+ Here I am using a binocular camera to detect obstacles. The binocular camera is shown in the figure:
![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/camera.png)

### Preliminary knowledge points:
+ Calibration of binocular camera
+ Use OpenCV to get pictures
+ Binocular correction
+ Stereo matching

#### Preliminary knowledge points of binocular camera calibration:
>Here, the calibration method I use is **Zhang Zhengyou Calibration Method**。
+ First of all, you need to be clear, for a camera, it is divided into *internal parameters* and *external parameters*
+ There are five internal parameters:
+ + The mapping relationship between the object captured by the camera and the actual object on the x, y axis (two parameters).
+ + The offset relationship between the center of the camera and the center of the image (two parameters).
+ + The installation of the camera and the lens is not completely vertical, and there is an angular deviation. (One parameter).
+ There are six external parameters: 
+ + They are translation and rotation in the x, y, and z directions, respectively.
>As long as we have the above two parameters, we basically know the correspondence between the image captured by the camera and the real thing. However, there will still be errors in "**distortion**" between the image captured by the camera and the real thing. This is due to the 2D point shift caused by lens quality and other reasons.

***Therefore, we use the Zhang Zhengyou calibration method to calibrate the camera's internal and external parameters and distortion parameters.***

## Zhang Zhengyou's calibration method
>Preface: Zhang Zhengyou's calibration, also called "Zhang's calibration", is a camera calibration method using a single planar chessboard, proposed by Professor Zhang Zhengyou in 1998.
+ Preparation:
+ + Calibration board
+ + >You need to prepare a calibration board yourself. It looks roughly like this:

![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/Calibration_board.jpg)
+ + A photo of the board taken in a real scene looks like this:

![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/True_Calibration_board.jpg)
+ There are two ways to get this kind of calibration board:
+ + Option 1: download it directly from the OpenCV website: [calibration board download](https://docs.opencv.org/2.4/_downloads/pattern.png)
+ + Option 2: generate a chessboard image with Python + OpenCV:
>
>```python
>import cv2 
>import numpy as np
>
>width = 350
>height = 500
>length = 50
>
>image = np.zeros((width,height),dtype = np.uint8)
>print(image.shape[0],image.shape[1])
>
>for j in range(height):
>    for i in range(width):
>        if((int)(i/length) + (int)(j/length))%2:
>            image[i,j] = 255;
>cv2.imwrite("pic/chess.jpg",image)
>cv2.imshow("chess",image)
>cv2.waitKey(0)
>```
**The generated image has the same specification as the one downloaded from the OpenCV website.**

### Zhang's calibration method in OpenCV
+ Corner extraction

**Function 1:** ***bool findChessboardCorners(InputArray image,Size atternSIze,OutputArray corners,int flags=CALIB_CB_ADAPTIVE_THRESH+CALIB_CB_NORMALIZE_IMAGE);***
>*Purpose: extracts the inner corners of the calibration board, that is, the corners in the middle of every four black and white squares in the example image.*
> + Parameters:
> + + image: the captured chessboard image;
> + + patternSize: the number of inner corners on the chessboard (for the board above, Size(9,6), i.e. 9 corners per row and 6 per column);
> + + corners: stores the image coordinates of the detected inner corners (usually a vector of Point2f);
> + + flags: defines different ways of searching for the inner corners on the chessboard.
> + + **Returns a bool indicating whether the corners were found in the image.**

**Function 2:** ***bool find4QuadCornerSubpix(InputArray img,InputOutputArray corners,Size region_size);***
>*Purpose: refines the initially extracted corners to sub-pixel accuracy to reduce calibration error. This method is designed specifically for getting the exact positions of the inner corners on a chessboard. (**cornerSubPix is sometimes used instead**)*
> + Parameters:
> + + img: the input Mat, preferably an 8-bit grayscale image;
> + + corners: the initial corner coordinates, which also receive the sub-pixel positions as output, so they must be floating point, usually a vector of Point2f/Point2d. *That is, pass in the third parameter of findChessboardCorners above*;
> + + region_size: the size of the corner search window;
> + *In general, cornerSubPix is used more often, but since we are using a chessboard here, 
find4QuadCornerSubpix is the one made specifically for getting the exact positions of the inner corners on a chessboard.*

**Function 3:** ***drawChessboardCorners( InputOutputArray image, Size patternSize, InputArray corners, bool patternWasFound);***
>*Purpose: draws the detected inner corners on the chessboard.*
> + Parameters:
> + + image: an 8-bit grayscale or color image.
> + + patternSize: the number of rows and columns of inner corners on each calibration board, i.e. the second parameter of findChessboardCorners;
> + + corners: the corner coordinates; you can pass in the output of the second parameter of find4QuadCornerSubpix;
> + + patternWasFound: a flag indicating whether all the inner corners were detected. true means they were all found, and the function connects all the inner corners with lines as a whole; false means some corners were not found, and the function marks the detected corners with (red) circles;
+ + Example code for finding the corners looks roughly like this:
```C++
Mat imageInput = imread("chess.jpg");
Size board_size = Size(9, 6);//number of corners per row and column on the board
vector<Point2f> image_points_buf;//buffers the corners detected in each image
/*extract corners*/
if (!findChessboardCorners(imageInput, board_size, image_points_buf))
{
    cout << "can not find chessboard corners!\n"; //corners not found  
    return;
}
else
{
    Mat view_gray;
    cvtColor(imageInput, view_gray, CV_RGB2GRAY);
    /*sub-pixel refinement*/
    find4QuadCornerSubpix(view_gray, image_points_buf, Size(5, 5)); //refine the roughly extracted corners  
    drawChessboardCorners(view_gray, board_size, image_points_buf, true); //mark the corners in the image  
    imshow("Camera Calibration", view_gray);//show the image  
    waitKey(0);     
}
```

+ Camera calibration
>With the image corners obtained above (in theory three images, i.e. three sets of data, are enough; in practice 10~20 is best because the error is smaller), you can calibrate the camera with calibrateCamera and compute its intrinsic parameters, extrinsic parameters and distortion parameters.

**Function 1:** ***double calibrateCamera(InputArrays objectPoints,InputAttaysOfArrays imagePoints,Size imageSize,CV_OUT InputOutputArray cameraMatrix,CV_OUT InputOutputArray distCoeffs,OutputArrayOfArrays rvecs,OutputArrayOfArrays tvecs,int flags=0,TermCriteria criteria = TermCriteria(TermCriteria::COUNT+TermCriteria::EPS,30,DBL_EPSILON));***
> + Parameters:
> + + objectPoints: the 3D points in the world coordinate system. Pass in a collection of vectors of 3D points. We usually assume the calibration board lies on the z=0 plane, and then compute the world coordinates of each inner corner from the size of a single square on the board (you can also just use 10 if you do not need an exact mapping to real-world units).
> + + imagePoints: the image coordinates corresponding to each inner corner, i.e. the corner sets found for each image above.
> + + imageSize: the pixel size of the image, needed when computing the camera's intrinsic and distortion matrices.
> + + cameraMatrix: the camera's intrinsic matrix. Just pass in a Mat cameraMatrix, e.g. Mat cameraMatrix=Mat(3,3,CV_32FC1,Scalar::all(0)).
> + + distCoeffs: the distortion matrix. Just pass in Mat distCoffs=Mat(1,5,CV_32FC1,Scalar::all(0));
> + + rvecs: the rotation vectors. Pass in a vector of Mat, i.e. vector<Mat>rvecs;
> + + tvecs: the translation vectors. Like rvecs, it should be vector<Mat> tvecs;
> + + flags: the algorithm used for calibration. flags can take the following values (if omitted, the behavior described for "not set" below applies):
> + + + CV_CALIB_USE_INTRINSIC_GUESS: when set, cameraMatrix should contain estimates of fx, fy, u0, v0. Otherwise (u0, v0) is initialized to the center of the image and fx, fy are estimated with least squares.
> + + + CV_CALIB_FIX_PRINCIPAL_POINT: keeps the principal point fixed during optimization. When CV_CALIB_USE_INTRINSIC_GUESS is set, the principal point stays at the center or at the given input value.
> + + + CV_CALIB_FIX_ASPECT_RATIO: fixes the ratio fx/fy and only treats fy as a variable during optimization. When CV_CALIB_USE_INTRINSIC_GUESS is not set, fx and fy are ignored and only the ratio fx/fy is used in the computation.
> + + + CV_CALIB_ZERO_TANGENT_DIST: sets the tangential distortion parameters (p1, p2) to zero.
> + + + CV_CALIB_FIX_K1,…,CV_CALIB_FIX_K6: keeps the corresponding radial distortion coefficient unchanged during optimization.
> + + + CV_CALIB_RATIONAL_MODEL: computes the three distortion parameters k4, k5, k6. If not set, only the other 5 distortion parameters are computed.
> + + criteria: the termination criteria for the iterative optimization.
>
>*Before calibrating with this function, initialize the spatial coordinates of each corner on the chessboard (i.e. assign values to them). The function computes the camera's intrinsic matrix and distortion, and each image also gets its own translation and rotation vectors.*
>
>`The implementation looks roughly like this:`
```C++
Size image_size;//image size
Size board_size = Size(9, 6);     //number of corners per row and column on the board
vector<Point2f> image_points_buf;  //buffers the corners detected in each image
vector<vector<Point2f>> image_points_seq; //stores all the detected corners
/*extract corners*/
char filename[10];
for (size_t image_num = 1; image_num <= IMGCOUNT; image_num++)
{
    sprintf_s(filename, "%d.jpg", image_num);
    Mat imageInput = imread(filename);
    if (!findChessboardCorners(imageInput, board_size, image_points_buf))
    {
        cout << "can not find chessboard corners!\n";//corners not found  
        return;
    }
    else
    {
        Mat view_gray;
        cvtColor(imageInput, view_gray, CV_RGB2GRAY);
        /*sub-pixel refinement*/
        find4QuadCornerSubpix(view_gray, image_points_buf, Size(5, 5));//refine the roughly extracted corners  
        drawChessboardCorners(view_gray, board_size, image_points_buf, true);//mark the corners in the image  
        image_points_seq.push_back(image_points_buf);//save the sub-pixel corners  
        imshow("Camera Calibration", view_gray);//show the image  
        //waitKey(500);//pause for half a second
    }
    image_size.width = imageInput.cols;
    image_size.height = imageInput.rows;
    imageInput.release();
}
/*camera calibration*/
vector<vector<Point3f>> object_points; //3D coordinates of the corners on the board; the first parameter of the calibration function
Size square_size = Size(10, 10);//the measured size of each square on the board; I did not actually measure it and just assumed a value, which does not seem to matter much; to be studied later
for (int t = 0; t<IMGCOUNT; t++)
{
    vector<Point3f> tempPointSet;
    for (int i = 0; i<board_size.height; i++)
    {
        for (int j = 0; j<board_size.width; j++)
        {
            Point3f realPoint;
            //assume the board lies on the z=0 plane of the world coordinate system
            realPoint.x = i*square_size.width;
            realPoint.y = j*square_size.height;
            realPoint.z = 0;
            tempPointSet.push_back(realPoint);
        }
    }
    object_points.push_back(tempPointSet);
}
//intrinsic and extrinsic parameter objects
Mat cameraMatrix = Mat(3, 3, CV_32FC1, Scalar::all(0));//camera intrinsic matrix
vector<int> point_counts;// number of corners in each image  
Mat distCoeffs = Mat(1, 5, CV_32FC1, Scalar::all(0));//the camera's 5 distortion coefficients: k1,k2,p1,p2,k3
vector<Mat> tvecsMat;//rotation vector of each image
vector<Mat> rvecsMat;//translation vector of each image
calibrateCamera(object_points, image_points_seq, image_size, cameraMatrix, distCoeffs, rvecsMat, tvecsMat, 0);//calibrate the camera
```

+ Image correction:
> Now that calibration has given us all the camera parameters, we can use them to correct the camera's images.

**Function:** ***void undistort(InputArray src, OutputArray dst,InputArray cameraMatrix,InputArray distCoeffs,InputArray newCameraMatrix=noArray());***
> + Parameters:
> + + src: input, the original distorted image;
> + + dst: the corrected output image, with the same type and size as the input;
> + + cameraMatrix: the camera intrinsic matrix obtained earlier;
> + + distCoeffs: the camera distortion matrix obtained earlier;
> + + newCameraMatrix: same as cameraMatrix by default;
>
>`Example usage:`
```C++
/*correct the images using the calibration results*/
for (size_t image_num = 1; image_num <= IMGCOUNT; image_num++)
{
    sprintf_s(filename, "%d.jpg", image_num);
    Mat imageSource = imread(filename);
    Mat newimage = imageSource.clone();
    undistort(imageSource, newimage, cameraMatrix, distCoeffs);
    imshow("source", imageSource);//show the image 
    imshow("drc", newimage);//show the image  
    waitKey(500);//pause for half a second
    imageSource.release();
    newimage.release();
}
```

### Zhang's calibration method in MATLAB
> Preparation: [toolbox download](http://www.vision.caltech.edu/bouguetj/calib_doc/download/index.html)
>
> Installation:
> + Unzip the downloaded toolbox file toolbox_calib.zip and copy the toolbox_calib folder into the MATLAB directory (or any other directory).
> + Start MATLAB and add the location of the TOOLBOX_calib folder to the MATLAB path.
> + To do this: File->Set Path->Add Folder, find the folder
>   TOOLBOX_calib you just placed, and click Save.
> + Capture images: name the captured images consistently and copy them into the toolbox_calib folder. The naming rule is a base name followed by a number. The base name comes first, immediately followed by the number, which has at most 3 decimal digits.
#### Single camera calibration
> + Preparation
>
>Make the folder containing the left and right images taken by the binocular camera MATLAB's current folder. My images are named like L1, L2..., R1, R2... (Note: image names follow the format letters + number, letters first and number after.)
>
> + Type calib_gui in the MATLAB command window and press Enter. The following window appears:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ToolBox.jpg)
>
> + Choose the first option ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/StandardVersion.jpg), and the main window below appears:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ToolBoxStandard.jpg)
>
> + `Notes:`
>
> + + "Image names" button: specify the base name and format of the images, and read the matching images into memory.
> + + "Read names" button: read the images with the given base name and format into memory.
>
> + + "Extract grid corners" button: extract the grid corners.
>
> + + "Calibration" button: calibrate the intrinsic parameters.
>
> + + "Show Extrinsic" button: show the relationship between the camera and the calibration target graphically.
>
> + + "Project on images" button: using the camera's intrinsic and extrinsic parameters (i.e. the transform from the target coordinate system to the camera coordinate system), reproject the grid corners from their Cartesian coordinates back into image space. 
>
> + + "Analyse error" button: analyze the error in image space
>
> + + "Recomp. corners" button: re-extract the grid corners.
>
> + + "Add/Suppress images" button: add or remove images.
>
> + + "Save" button: save the calibration results. The intrinsic results and the extrinsic parameters between the camera and the target are saved as the m-file Calib_results.m in the toolbox_calib folder.
>
> + + "Load" button: load calibration results from the file Calib_results.mat in the toolbox_calib folder.
>
> + + "Exit" button: exit calibration.
>
> + + "Comp. Extrinsic" button: compute the extrinsic parameters. 
>
> + + "Undistort image" button: generate and save undistorted images. 
>
> + + "Export calib data" button: export the calibration data. For each target image, the corners are saved as two text files, one with planar coordinates in the target coordinate system and one with image coordinates.
>
> + + "Show calib results" button: show the calibration results.
>
> + Choose the first button ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ImageNames.jpg). The command window shows everything in the current folder:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/Calib_Results.jpg)
>
>It then prompts "Basename camera calibration images (without number norsuffix):". For my image names, when calibrating the left images I enter: L. For the image format, choose j. After pressing Enter, all the loaded images are shown.
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/LoadImage.jpg)
>
>20 images were read in total
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/20Images.jpg)
>
> + Go back to the main window and choose the third option ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ExtractGridCorners.jpg). The command window shows the following prompts; accept the defaults by pressing Enter:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/Wintx_Winty.png)
>
> + `Notes:`
> + + a: At the "wintx ([] = 5) =" and "winty ([] = 5) =" prompts, enter the half-width m and half-height n of the corner extraction window. m and n are positive integers in pixels, 5 pixels by default. Once m and n are chosen, the command window shows the window size (2n+1)x(2m+1). For example, with the defaults the corner extraction window is 11x11 pixels.
> + + b: At "Do you want to use the automatic square counting mechanism (0=[]=default) or do you always want to enter the number of squares manually (1,other)?", the default 0 counts the rows and columns of squares in the selected area of the chessboard automatically, and 1 means you count and enter them yourself.
>
> + After pressing Enter, the first chessboard image appears and you extract the corners: click the 4 outer corners of the chessboard with the mouse. The first point you click is the origin O; click the others in order (clockwise or counterclockwise), as shown:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ClickOnTheFourExtemeCorners.jpg) ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ExtremeCorners.jpg)
>
> + `Note:`
>
> + + 1) Some guides say you should click the inner corners, as shown in the picture. I checked many sources and found no clear requirement, but after comparing, I personally think it depends on the calibration board.
>
> + + ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/WrongPicture.jpg)
>
> + + 2) The sides of the quadrilateral you form should be roughly parallel to the grid lines of the chessboard. Otherwise the accuracy of corner extraction suffers, and the corners may even be extracted wrongly.
>
> + Go back to the command window and enter the chessboard information:
>
>"Number of squares along the X direction ([]=10) =" enter the number of squares in the X direction: 7
>
>"Number of squares along the Y direction ([]=10) =" enter the number of squares in the Y direction: 9
>
>"Size dX of each square along the X direction ([]=100mm) =" enter the length of a square in the X direction (mm): 29. The squares on my chessboard are 29mm in both the X and Y directions.
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/CornerExtraction.jpg)
>
>After pressing Enter, the extracted corners are shown. (My chessboard was printed and stuck onto a cardboard box, so it is not perfectly flat, and some corners are slightly off from their real positions.)
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/Feature2.jpg)
>
> + `Notes:`
>
>When the MATLAB command window shows "Need of an initial guess for distortion? ([]=no, other=yes)", choosing no means you do not enter an initial distortion value, and choosing yes means you do. The initial value you enter is assigned to all 5 distortion coefficients to be estimated: the radial distortion coefficients kc(1), kc(2), kc(5) and the tangential distortion coefficients kc(3), kc(4). If the 6th-order radial distortion coefficient kc(5) is not estimated, kc(5) is set to 0.
>
> + Repeat this for each of the remaining images (I had 20)
>
>Note: once you fill in the information for the first image, the second image uses it as the default, so you only need to press Enter. But be aware that the X and Y directions depend only on the first corner you click. For example:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/Feature1.jpg)![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/feature3.jpg)
>
>The chessboard has the same orientation (landscape) in both images, but I clicked a different first corner, so the origin O and the X and Y directions are different. To avoid re-entering the chessboard information every time, always choose the same position for the first corner. (If the chessboard appears in different orientations, both landscape and portrait, then the first point should be the one at the same position relative to the chessboard. I learned that the hard way.)
>
> + After corner extraction, run the calibration. A .mat file appears in the folder. (It is best to rename it to calib_data_left.mat so it is not overwritten when you calibrate the right images later.)
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/calib_data.png)
>
>Go back to the main window and choose the fourth option ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/calibration.jpg):
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/calibrationResult.jpg)
>
> + Show the relationship between the camera and the calibration board:
>
>Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ShowExtrinsic.jpg) in the main window to show the relationship between the camera and the calibration target in a new figure window:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/IO.jpg)
>
> + Error analysis:
>
>Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/AnalyseError.jpg) to show, in a new figure window, the image-coordinate error of all calibration corners reprojected into image space, as shown:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/Error.jpg)
>
>In the figure window shown, you can move the crosshair with the mouse to select a corner, and the command window shows that corner's information: which image it belongs to, its index, its coordinates in units of squares, its image coordinates, the reprojection error, and the half-width m and half-height n of the corner extraction window.
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/WindowSize.jpg)
>
> + Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/save.jpg), and the following files appear in the folder:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/CalibResults.jpg)
>
> + `Note:` the Result.mat file is used in stereo calibration. Rename "Calib_Results.mat" to "Calib_Results_left.mat ".
>
> + Click "Undistort image" to remove distortion from the images. Choose whether to process one image or all of them (all by default). The undistorted images are then saved.
>
> ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/UndistortImage.jpg)
>
>
>
#### Stereo calibration
>
> + Process the images from the right camera the same way.
>
>Calibration results:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/RightResults.jpg)
>
> + Once each camera has been calibrated on its own, you can run the stereo calibration. Type `stereo_gui` in the MATLAB command window, and the following window appears:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/StereoCameraToolbox.jpg)
>
> + Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/LoadLeftRightFiles.jpg). The command window asks for the names of the .mat files. Press Enter to accept the default names (Calib_Result_left.mat and Calib_Result_right.mat), or type your own file names.
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/LoadingFiles.png)
>
> + After loading the files, the command window shows the parameters of the left and right cameras:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/LoadResults.jpg)
>
> + `Notes:`
>
> + fc_left is the scale factor of the left camera, i.e. the factor that maps image points on the focal-length-normalized image plane to image coordinates. cc_left is the principal point of the left camera, in pixels. alpha_c_left is the angle between the actual y axis and the ideal y axis of the left camera, in radians, 0 by default. kc_left is the distortion coefficients of the left camera. fc_right is the scale factor of the right camera, i.e. the factor that maps image points on the focal-length-normalized image plane to image coordinates. cc_right is the principal point of the right camera, in pixels. alpha_c_right is the angle between the actual y axis and the ideal y axis of the right camera, in radians, 0 by default. kc_right is the distortion coefficients of the right camera. om is the Rodrigues rotation vector of the left camera's orientation relative to the right camera; the rodrigues function converts it into an orientation matrix. T is the translation vector of the left camera relative to the right camera, i.e. the position of the left camera's origin in the right camera's coordinate system, in mm.
>
> + Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/RunStereoCalibration.png) to compute the optimized extrinsic parameters. The command window outputs the intrinsic parameters of the left and right cameras and the optimized extrinsic parameters, as shown below:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/StereoCalibrationResults.jpg)
>
> + Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ShowExtrinsicsOfStereoRig.jpg) to show the position of the calibration target relative to the binocular camera:
>
>![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/ExtrinsicParameters.jpg)
>
> + Click ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/SaveStereoCalibResults.png) to save the calibration results as the file ![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/CalibResultsStereo.png)
>
> + `Notes:`
>
> + What each stereo calibration button does:
>
> + + "Load left and right calibration files" button: loads the calibration results of the left and right cameras and makes an initial estimate of the pose of the left camera relative to the right camera.
>
> + + "Run stereo calibration" button: computes the optimized extrinsic parameters. 
>
> + + "Show Extrinsics of stereo rig" button: shows the pose of the target relative to the cameras.
>
> + + "Show Intrinsic parameters" button: shows the intrinsic parameters of the left and right cameras and the optimized extrinsic parameters in the MATLAB command window.
>
> + + "Save stereo calib results" button: saves the calibration results as Calib_Results_stereo.mat in the toolbox_calib folder.
>
> + + "Load stereo calib results" button: loads the calibration results from Calib_Results_stereo.mat in the toolbox_calib folder.
>
> + + "Rectify the calibration images" button: processes all target images captured by the left and right cameras using the distortion coefficients, and saves the undistorted images in the toolbox_calib folder. Each undistorted image is named after the original, with _rectified inserted between the base name and the number.
>
> + + "Exit" button: exits stereo calibration.
>
#### Summary:
`Things to watch out for when calibrating with the MATLAB toolbox:`
+ Intrinsic calibration 
+ + Take special care when making the chessboard target: the black and white squares must be the same size, and all squares must be exactly the same size. The target should not have too few squares; more than 10 rows and columns is best. The squares should be neither too large nor too small: in the captured image, each square should be at least 20 pixels on a side.
+ + Take special care when capturing target images: capture several images of the target from different angles and positions. The images must be sharp, and the target should take up about 1/3~3/4 of the whole image. Ideally the target appears in different parts of the image across the set, rather than always in the same area. The distance between the target and the camera should ideally be the main working distance of the vision system. The angle of the target relative to the camera should vary widely, including large rotations around all three axes, preferably at least 30 degrees. Do not capture too few images; 10~20 target images is recommended. 
+ + Do not change the camera's focal length while capturing images. The focal length is one of the camera's intrinsic parameters, so images taken at different focal lengths imply different intrinsic parameters, and calibrating them together will not give correct results. 
+ + Name all target images consistently with a base name and a number, such as Image1~Image15. All target images must use the same data format. 
+ + When extracting corners, click in the figure window to define the selected area of the chessboard target. The first corner you click becomes the origin of the target coordinate system; click the 4 corners in order to form a quadrilateral. Two consecutively clicked corners should lie on the same grid line, so that the sides of the quadrilateral are roughly parallel to the grid lines of the chessboard. To click the corners more accurately, maximize the window showing the target image and use the mouse crosshair to click the 4 corners as precisely as possible.
+ + Whether the angle alpha_c between the camera's actual y axis and ideal y axis is calibrated is controlled by the est_alpha flag. With est_alpha=1, alpha_c is calibrated; with est_alpha=0, it is not.
+ + The array est_dist(1:5) flags whether each distortion coefficient kc(1:5) is calibrated. Only coefficients whose flag is 1 are calibrated; those with flag 0 are not. The default is est_dist(1:5)=[1 1 1 1 0], i.e. kc1~kc4 are calibrated and kc5 is not (kc5=0).
+ + After running calib_gui, MATLAB is busy and the command window does not respond to other commands. Only after you click "Exit" in the calibration toolbox does the command window respond again.
+ Extrinsic calibration 
+ + You must enter the actual size of the squares
+ + When extracting corners, the first corner you click in the figure window becomes the origin of the target coordinate system. The resulting extrinsic parameters are the pose of the target coordinate system in the camera coordinate system
+ + The Rodrigues rotation vector omc_ext and the orientation matrix Rc_ext can be converted into each other with the rodrigues function: omc_ext=rodrigues(Rc_ext), Rc_ext=rodrigues(omc_ext)
+ Stereo calibration
+ + When extracting corners, the first corner you click in the figure window becomes the origin of the target coordinate system. For each pair of target images from the left and right cameras, choose the same first corner as the origin. The other 3 corners should also be the same in the left and right images.
+ + The left and right cameras must capture the same number of images. Left and right images with the same number are taken with the target in the same pose, and together they form one stereo pair of target images.
+ + The resulting extrinsic parameters are the pose of the left camera relative to the right camera, i.e. the pose of the left camera's coordinate system in the right camera's coordinate system.
+ + After running stereo_gui, the MATLAB command window still responds to other commands.

## Capturing images with OpenCV
>There are two versions of the code for capturing images with OpenCV, one in Python and one in C++, but the idea is the same: `read the video first, then grab frames`.

+ Python code:
+ `Note: set the save path according to your own computer. Here I just use the paths on my machine for taking and saving photos`.
```python
import cv2
import time
from PIL import Image


def shot(pos, frame):
    global counter
    path = folder + pos + "_" + str(counter) + ".jpg"
    cv2.imwrite(path, frame)
    print("snapshot saved into: " + path)

if __name__ == '__main__':

    AUTO = True  # take photos automatically, or manually by pressing s
    INTERVAL = 1  # interval between automatic photos

    cv2.namedWindow("middle")
    cv2.moveWindow("middle", 400, 0)
    middle_camera = cv2.VideoCapture(1)

    counter = 0
    utc = time.time()
    pattern = (12, 8)  # chessboard size
    folder = "F:/PyCharm_code/OpenCVDemo/snapshot/"  # folder for the photos (change it to your own path)

    while True:
        # ret, left_frame = left_camera.read()
        ret, middle_frame = middle_camera.read()

        # cv2.imshow("left", left_frame)
        cv2.imshow("middle", middle_frame)

        now = time.time()
        if AUTO and now - utc >= INTERVAL:
            shot("middle", middle_frame)
            img = Image.open(folder + "middle" + "_" + str(counter) + ".jpg")
            width, height = img.size
            w = width * 0.5
            right_box = (0, 0, w, height)
            left_box = (w, 0, width, height)
            right_region = img.crop(right_box)
            left_region = img.crop(left_box)
            right_region.save(folder + "RightTest" + "/" + str(counter) + ".jpg")
            left_region.save(folder + "LeftTest" + "/" + str(counter) + ".jpg")

            counter += 1
            utc = now


        key = cv2.waitKey(1)
        if key == ord("q"):
            break
        elif key == ord("s"):
            shot("middle", middle_frame)
            counter += 1

    middle_camera.release()
    cv2.destroyWindow("middle")
```
> + `Note:` my binocular camera shows the left and right cameras side by side in one frame when taking photos, so there is an extra step that splits the image. The splitting code:

```python
            img = Image.open(folder + "middle" + "_" + str(counter) + ".jpg")
            width, height = img.size
            w = width * 0.5
            right_box = (0, 0, w, height)
            left_box = (w, 0, width, height)
            right_region = img.crop(right_box)
            left_region = img.crop(left_box)
            right_region.save(folder + "RightTest" + "/" + str(counter) + ".jpg")
            left_region.save(folder + "LeftTest" + "/" + str(counter) + ".jpg")
```
> + Read the image, split it, then save both halves.
+ C++ code:
```C++
    VideoCapture capture(0);
	Mat frame;
	if (!capture.isOpened())
	{
		cout << "Failed to open the camera" << endl;
		return -1;
	}
	char key;
	char filename[200] = "F:\VisualStudioProject\OpencvTest\srcPicture";//set this path for your own computer
	int count = 0;
	namedWindow("[Video]", 1);
	namedWindow("[Photo]", 1);
	while (1) {
		key = waitKey(30);
		capture >> frame;
		imshow("[Video]", frame);
		/*imwrite(filename, frame);*/
		if (key == 27)
			break;//press ESC to exit  
		if (key == 32)//press Space to take a photo  
		{
			sprintf_s(filename, "%d.jpg", ++count);
			cout << "Done" << endl;
			imwrite(filename, frame);//save the photo in the project folder  
			imshow("[Photo]", frame);
		}

	}
```
## Stereo rectification of the images

```C++
/*stereo rectification*/
Rodrigues(rec, R); //Rodrigues transform
stereoRectify(cameraMatrixL, distCoeffL, cameraMatrixR, distCoeffR,imageSize, R, T, Rl, Rr, Pl, Pr, Q, CALIB_ZERO_DISPARITY,0, imageSize, &validROIL, &validROIR);
initUndistortRectifyMap(cameraMatrixL, distCoeffL,Rl,Pr,imageSize,CV_32FC1, mapLx, mapLy);
initUndistortRectifyMap(cameraMatrixR, distCoeffR,Rr,Pr,imageSize,CV_32FC1, mapRx, mapRy);
```

## Stereo matching
>Stereo matching uses the Block Matching algorithm. Block Matching uses the SAD method, which is fast but gives average results.

`Parameter settings:`
+ MinDisparity is set to 0, because the two cameras face forward in parallel, so the same object is always further right in the left image than in the right image. If you angle the two cameras inward to get a larger overlapping area, you need to take this parameter into account. 
+ UniquenessRatio mainly prevents false matches, and it has a big effect on the final result. In stereo matching, it is better to leave an area unmatched than to match it wrongly. False matches cause a lot of trouble in applications like obstacle detection. The value cannot be negative; something around 5-15 is usually appropriate. int.
+ BlockSize: the SAD window size. The allowed range is [5,255], and it should generally be between 5x5 and 21x21. It must be odd. int.
+ NumDisparities: the disparity window, i.e. the difference between the maximum and minimum disparity. The window size must be a multiple of 16. int. 
+ Among the BM parameters, the ones that affect the disparity result most are BlockSize, NumDisparities and UniquenessRatio. Usually you only need to tune these three and leave the rest at their defaults. 

`How a binocular camera works:`

![](https://raw.githubusercontent.com/kentanvictor/STUDY/Image/StereoPhoto.png)

>The disparity disp computed by BM is in CV_16S format. You need disp.convertTo(disp8, CV_8U, 255/(numberOfDisparities*16.)) to get the real disparity values. 
Then reprojectImageTo3D converts the disparity matrix into a matrix of real physical coordinates. When computing actual distances, the X / W, Y / W, Z / W produced by reprojectImageTo3D must all be multiplied by 16 (i.e. W divided by 16) to get the correct 3D coordinates. 

+ Stereo matching code:
```C++
/*****stereo matching*****/
void stereo_match(int, void*)
{
	bm->setBlockSize(2 * blockSize + 5);     //SAD window size, ideally between 5 and 21
	bm->setROI1(validROIL);
	bm->setROI2(validROIR);
	bm->setPreFilterCap(31);
	bm->setMinDisparity(0);  //minimum disparity, 0 by default, can be negative, int
	bm->setNumDisparities(numDisparities * 16 + 16);//disparity window, i.e. max disparity minus min disparity; must be a multiple of 16, int
	bm->setTextureThreshold(10);
	bm->setUniquenessRatio(uniquenessRatio);//uniquenessRatio mainly prevents false matches
	bm->setSpeckleWindowSize(100);
	bm->setSpeckleRange(32);
	bm->setDisp12MaxDiff(-1);
	Mat disp, disp8,copyImage;
	bm->compute(rectifyImageL, rectifyImageR, disp);//input images must be grayscale
	disp.convertTo(disp8, CV_8U, 255 / ((numDisparities * 16 + 16)*16.));//the computed disparity is in CV_16S format
	reprojectImageTo3D(disp, xyz, Q, true); //when computing actual distances, X / W, Y / W, Z / W from ReprojectTo3D must be multiplied by 16 (i.e. W divided by 16) to get the correct 3D coordinates.
	xyz = xyz * 16;
	imshow("disparity", disp8);
	copyImage = disp8.clone();
	imshow("contour", copyImage);
	//draw convex hulls based on the disparity map
	Mat threshold_output;
	vector<vector<Point> > contours;
	vector<Vec4i> hierarchy;
	RNG rng(12345);
	threshold(copyImage, threshold_output, 20, 255, CV_THRESH_BINARY);//binarize
	findContours(threshold_output, contours, hierarchy, CV_RETR_TREE, CV_CHAIN_APPROX_SIMPLE, Point(0, 0));//find contours
	/// compute the convex hull of each contour
	vector<vector<Point> >hull(contours.size());
	vector<vector<Point> > result;
	for (int i = 0; i < contours.size(); i++)
	{
		convexHull(Mat(contours[i]), hull[i], false);

	}

	/// draw the contours and their convex hulls
	Mat drawing = Mat::zeros(threshold_output.size(), CV_8UC3);
	for (int i = 0; i< contours.size(); i++)
	{
		if (contourArea(contours[i]) < 500)//hulls smaller than this area can be ignored
			continue;
		result.push_back(hull[i]);
		Scalar color = Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255));
		drawContours(drawing, contours, i, color, 1, 8, vector<Vec4i>(), 0, Point());
		drawContours(drawing, hull, i, color, 1, 8, vector<Vec4i>(), 0, Point());
	}
	imshow("contours", drawing);//convex hull size
}
```

## Summary:
>Use MATLAB or OpenCV to determine the intrinsic and extrinsic parameters, fill the measured values into the code, then run stereo rectification and stereo matching. This gives you a depth map, and running the disparity computation on it gives you the disparity map.
+ The complete code:
```C++
#include <opencv2\opencv.hpp>
#include <string>
#include <iostream>
#include "opencv2/imgproc/imgproc.hpp"
#include <opencv2/core/core.hpp>
#include <opencv2/highgui/highgui.hpp>

using namespace std;
using namespace cv;

const int imageWidth = 320;                             //camera resolution  
const int imageHeight = 240;
Size imageSize = Size(imageWidth, imageHeight);

Mat rgbImageL, grayImageL;
Mat rgbImageR, grayImageR;
Mat rectifyImageL, rectifyImageR;

Rect validROIL;//after rectification the image is cropped; validROI is the area left after cropping  
Rect validROIR;

Mat mapLx, mapLy, mapRx, mapRy;     //lookup maps  
Mat Rl, Rr, Pl, Pr, Q;              //rectification rotation matrix R, projection matrix P, reprojection matrix Q
Mat xyz;							//3D coordinates


Point origin;					//start point where the mouse was pressed
Rect selection;					//selection rectangle
bool selectObject = false;		//whether an object is being selected

int blockSize = 7, uniquenessRatio = 20, numDisparities = 0;
Ptr<StereoBM> bm = StereoBM::create(16, 9);

/*
camera parameters calibrated beforehand
fx 0 cx
0 fy cy
0 0  1
*/
Mat cameraMatrixL = (Mat_<double>(3, 3) << 248.32797, 0, 248.24842,
	0, 150.87402, 114.30813,
	0, 0, 1);
Mat distCoeffL = (Mat_<double>(5, 1) << 0.04477, -0.10081, 0.01026, 0.00132, 0.00000);

Mat cameraMatrixR = (Mat_<double>(3, 3) << 248.74867, 0, 248.84978,
	0, 152.62972, 98.07575,
	0, 0, 1);
Mat distCoeffR = (Mat_<double>(5, 1) << -0.04158, 0.08338, -0.00584, 0.00611, 0.00000);

Mat T = (Mat_<double>(3, 1) << 182.44004, 0.20804, 0.41865);//T: translation vector
Mat rec = (Mat_<double>(3, 1) << -0.05347, -0.00229, -0.00203);//rec: rotation vector
Mat R;//R: rotation matrix


/*****stereo matching*****/
void stereo_match(int, void*)
{
	bm->setBlockSize(2 * blockSize + 5);     //SAD window size, ideally between 5 and 21
	bm->setROI1(validROIL);
	bm->setROI2(validROIR);
	bm->setPreFilterCap(31);
	bm->setMinDisparity(0);  //minimum disparity, 0 by default, can be negative, int
	bm->setNumDisparities(numDisparities * 16 + 16);//disparity window, i.e. max disparity minus min disparity; must be a multiple of 16, int
	bm->setTextureThreshold(10);
	bm->setUniquenessRatio(uniquenessRatio);//uniquenessRatio mainly prevents false matches
	bm->setSpeckleWindowSize(100);
	bm->setSpeckleRange(32);
	bm->setDisp12MaxDiff(-1);
	Mat disp, disp8,copyImage;
	bm->compute(rectifyImageL, rectifyImageR, disp);//input images must be grayscale
	disp.convertTo(disp8, CV_8U, 255 / ((numDisparities * 16 + 16)*16.));//the computed disparity is in CV_16S format
	reprojectImageTo3D(disp, xyz, Q, true); //when computing actual distances, X / W, Y / W, Z / W from ReprojectTo3D must be multiplied by 16 (i.e. W divided by 16) to get the correct 3D coordinates.
	xyz = xyz * 16;
	imshow("disparity", disp8);
	copyImage = disp8.clone();
	imshow("contour", copyImage);
	//draw convex hulls based on the disparity map
	Mat threshold_output;
	vector<vector<Point> > contours;
	vector<Vec4i> hierarchy;
	RNG rng(12345);
	threshold(copyImage, threshold_output, 20, 255, CV_THRESH_BINARY);//binarize
	findContours(threshold_output, contours, hierarchy, CV_RETR_TREE, CV_CHAIN_APPROX_SIMPLE, Point(0, 0));//find contours
	/// compute the convex hull of each contour
	vector<vector<Point> >hull(contours.size());
	vector<vector<Point> > result;
	for (int i = 0; i < contours.size(); i++)
	{
		convexHull(Mat(contours[i]), hull[i], false);

	}

	/// draw the contours and their convex hulls
	Mat drawing = Mat::zeros(threshold_output.size(), CV_8UC3);
	for (int i = 0; i< contours.size(); i++)
	{
		if (contourArea(contours[i]) < 500)//hulls smaller than this area can be ignored
			continue;
		result.push_back(hull[i]);
		Scalar color = Scalar(rng.uniform(0, 255), rng.uniform(0, 255), rng.uniform(0, 255));
		drawContours(drawing, contours, i, color, 1, 8, vector<Vec4i>(), 0, Point());
		drawContours(drawing, hull, i, color, 1, 8, vector<Vec4i>(), 0, Point());
	}
	imshow("contours", drawing);//convex hull size
}



/*****mouse callback*****/
static void onMouse(int event, int x, int y, int, void*)
{
	if (selectObject)
	{
		selection.x = MIN(x, origin.x);
		selection.y = MIN(y, origin.y);
		selection.width = std::abs(x - origin.x);
		selection.height = std::abs(y - origin.y);
	}

	switch (event)
	{
	case EVENT_LBUTTONDOWN:   //left mouse button pressed
		origin = Point(x, y);
		selection = Rect(x, y, 0, 0);
		selectObject = true;
		cout << origin << "in world coordinate is: " << xyz.at<Vec3f>(origin) << endl;
		/*cout << origin << " depth: " << xyz.at<Vec3f>(origin) << endl;*/
		break;
	case EVENT_LBUTTONUP:    //left mouse button released
		selectObject = false;
		if (selection.width > 0 && selection.height > 0)
			break;
	}
}




int main()
{
	VideoCapture capture(0);
	Mat frame;
	if (!capture.isOpened())
	{
		cout << "Failed to open the camera" << endl;
		return -1;
	}
	char key;
	char filename[200] = "F:\VisualStudioProject\OpencvTest\srcPicture";
	int count = 0;
	namedWindow("[Video]", 1);
	namedWindow("[Photo]", 1);
	while (1) {
		key = waitKey(30);
		capture >> frame;
		imshow("[Video]", frame);
		/*imwrite(filename, frame);*/
		if (key == 27)
			break;//press ESC to exit  
		if (key == 32)//press Space to take a photo  
		{
			sprintf_s(filename, "%d.jpg", ++count);
			cout << "Done" << endl;
			imwrite(filename, frame);//save the photo in the project folder  
			imshow("[Photo]", frame);
		}

	}
	
	/*
	stereo rectification
	*/
	Rodrigues(rec, R); //Rodrigues transform
	stereoRectify(cameraMatrixL, distCoeffL, cameraMatrixR, distCoeffR, imageSize, R, T, Rl, Rr, Pl, Pr, Q, CALIB_ZERO_DISPARITY,
		0, imageSize, &validROIL, &validROIR);
	initUndistortRectifyMap(cameraMatrixL, distCoeffL, Rl, Pr, imageSize, CV_32FC1, mapLx, mapLy);
	initUndistortRectifyMap(cameraMatrixR, distCoeffR, Rr, Pr, imageSize, CV_32FC1, mapRx, mapRy);

	/*
	read the images
	*/
	string left_test = "F:\\VisualStudioProject\\OpencvTest\\LeftPicture\\LDemo.jpg";
	string right_test = "F:\\VisualStudioProject\\OpencvTest\\RightPicture\\RDemo.jpg";
	rgbImageL = imread(left_test, CV_LOAD_IMAGE_COLOR);
	cvtColor(rgbImageL, grayImageL, CV_BGR2GRAY);
	rgbImageR = imread(right_test, CV_LOAD_IMAGE_COLOR);
	cvtColor(rgbImageR, grayImageR, CV_BGR2GRAY);

	imshow("ImageL Before Rectify", grayImageL);
	imshow("ImageR Before Rectify", grayImageR);
	/*
	after remap, the left and right images are coplanar and row-aligned
	*/
	remap(grayImageL, rectifyImageL, mapLx, mapLy, INTER_LINEAR);
	remap(grayImageR, rectifyImageR, mapRx, mapRy, INTER_LINEAR);


	/*
	show the rectification result
	*/
	Mat rgbRectifyImageL, rgbRectifyImageR;
	cvtColor(rectifyImageL, rgbRectifyImageL, CV_GRAY2BGR);  //pseudo-color image
	cvtColor(rectifyImageR, rgbRectifyImageR, CV_GRAY2BGR);

	//show separately
	//rectangle(rgbRectifyImageL, validROIL, Scalar(0, 0, 255), 3, 8);
	//rectangle(rgbRectifyImageR, validROIR, Scalar(0, 0, 255), 3, 8);
	imshow("ImageL After Rectify", rgbRectifyImageL);
	imshow("ImageR After Rectify", rgbRectifyImageR);

	//show both in one image
	Mat canvas;
	double sf;
	int w, h;
	sf = 600. / MAX(imageSize.width, imageSize.height);
	w = cvRound(imageSize.width * sf);
	h = cvRound(imageSize.height * sf);
	canvas.create(h, w * 2, CV_8UC3);   //mind the channels

										//draw the left image on the canvas
	Mat canvasPart = canvas(Rect(w * 0, 0, w, h));                                //get one part of the canvas  
	resize(rgbRectifyImageL, canvasPart, canvasPart.size(), 0, 0, INTER_AREA);     //scale the image to the size of canvasPart  
	Rect vroiL(cvRound(validROIL.x*sf), cvRound(validROIL.y*sf),                //get the cropped area    
		cvRound(validROIL.width*sf), cvRound(validROIL.height*sf));
	//rectangle(canvasPart, vroiL, Scalar(0, 0, 255), 3, 8);                      //draw a rectangle  
	cout << "Painted ImageL" << endl;

	//draw the right image on the canvas
	canvasPart = canvas(Rect(w, 0, w, h));                                      //get the other part of the canvas  
	resize(rgbRectifyImageR, canvasPart, canvasPart.size(), 0, 0, INTER_LINEAR);
	Rect vroiR(cvRound(validROIR.x * sf), cvRound(validROIR.y*sf),
		cvRound(validROIR.width * sf), cvRound(validROIR.height * sf));
	//rectangle(canvasPart, vroiR, Scalar(0, 0, 255), 3, 8);
	cout << "Painted ImageR" << endl;

	//draw the matching lines
	for (int i = 0; i < canvas.rows; i += 16)
		line(canvas, Point(0, i), Point(canvas.cols, i), Scalar(0, 255, 0), 1, 8);
	imshow("rectified", canvas);
	//find_obstacle(grayImageL, 20, 255, 500);

	/*
	stereo matching
	*/
	namedWindow("disparity", CV_WINDOW_AUTOSIZE);
	// create the SAD window trackbar
	createTrackbar("BlockSize:\n", "disparity", &blockSize, 8, stereo_match);
	// create the disparity uniqueness percentage trackbar
	createTrackbar("UniquenessRatio:\n", "disparity", &uniquenessRatio, 50, stereo_match);
	// create the disparity window trackbar
	createTrackbar("NumDisparities:\n", "disparity", &numDisparities, 16, stereo_match);
	//mouse callback: setMouseCallback(window name, callback function, argument passed to the callback, usually 0)
	setMouseCallback("disparity", onMouse, 0);
	stereo_match(0, 0);

	waitKey(0);
	return 0;
}
```

`Notes:`
+ In the code above, you need to fill in the following yourself:
+ + The measured intrinsic and extrinsic parameters of your camera
+ + The paths for saving and reading images
