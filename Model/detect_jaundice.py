import cv2 as cv
import pickle
import numpy as np
from jaundice.settings import BASE_DIR
from ML.feature_extraction import getMostDominantColor
import keyboard

eye=cv.CascadeClassifier(f"{BASE_DIR}/Model/eye.xml")
model=pickle.load(open(f"{BASE_DIR}/Model/model.pkl","rb"))
# model=pickle.load(open("D:/ML Project/cnn test/cnn_model.pkl","rb"))

def detect(img,eye:cv.CascadeClassifier=eye):
    img1=img.copy()
    face_rect=eye.detectMultiScale(img1,scaleFactor = 1.2,minNeighbors = 5)
    target=[]
    for x,y,l,w in face_rect:
        imge=img[y:y+l,x:x+w]
        imge=cv.resize(imge,(250,250))
        target.append(imge)
        img1=cv.rectangle(img1,(x,y),(x+w,y+l),(255,0,255))
    return img1,target

def loadCamera():
    video=cv.VideoCapture(0)
    while(True):
        _,img=video.read()
        img,target=detect(img,eye)
        cv.imshow("Video",img)
        if(keyboard.is_pressed("s")):
            break
        cv.waitKey(1)
    return target

def findJaundice(target):
    not_have_prob=0
    have_prob=0
    for item in target:
        color,_=getMostDominantColor(item)
        color=np.array(color)
        color=np.reshape(color,(1,-1))
        # color=np.reshape(color,(1,50,50,3))
        y=model.predict_proba(color)
        # y=model.predict(color)
        not_have_prob+=y[0][0]
        have_prob+=y[0][1]
    if(len(target)!=0):
        not_have_prob/=len(target)
        have_prob/=len(target)
        if(not_have_prob>=have_prob):
            return 0,(not_have_prob)
        else:
            return 1,have_prob
    else:
        return -1,-1

def imageUpload(path,isload=True,):
    img=cv.imread(path)
    if(isload):
        img,target=detect(img,eye)
    else:
        return [img]
if __name__=="__main__":
    try:
        while(True):
            use=int(input("Enter Type 1) Video Camera 2) Upload Image: "))
            if(use==1):
                target=loadCamera()
            elif(use==2):
                img_path=input("Enter Image Path : ")
                target=imageUpload(img_path)

            else:
                print("Invalid Key Enter")
                continue
            output,probability=findJaundice(target)
            if(output==0):
                print("You Don't Have Jaundice with Accuracy %.2f%%"%(probability*100))
            elif(output==1):
                print("You Have Jaundice with Accuracy %.2f%%"%(probability*100))
            else:
                print("Eye Not Found")
            break
    except:
        print("Image Not Found")
        