from django.http import JsonResponse
from base64 import b64decode
from io import BytesIO
from django.views.decorators.csrf import csrf_exempt
import cv2 as cv
import numpy as np
from PIL import Image
import json
from Model import detect_jaundice

@csrf_exempt
def haveJaundice(request):
    try:
        data=json.loads(request.body)
        dataUrl=data["dataURL"]
        img=captureImage(dataUrl=dataUrl)
        _,target=detect_jaundice.detect(img)
        if(len(target)<=1):
            return JsonResponse({"status":False,"msg":"Eye Not Detect"},status=404)
        predict,prob=detect_jaundice.findJaundice(target)
        return JsonResponse({"status":True,"Predict":predict,"Probability":"%.2f"%(prob)},status=200)
    except Exception as e:
        print(e)
        return JsonResponse({"status":False},status=500)
def captureImage(dataUrl):
    try:
        data=b64decode(dataUrl.split(",")[1])
        img=Image.open(BytesIO(data))
        img=np.array(img)
        img=cv.cvtColor(img,cv.COLOR_RGBA2BGR)
        return img
    except Exception as e:
        print(e)
        raise Exception(e)
    