import cv2, numpy as np
im = cv2.imread('../public/images/poster.jpg')
H,W = im.shape[:2]
lab = cv2.cvtColor(im, cv2.COLOR_BGR2LAB).astype(np.float32)
L = lab[...,0]; A = lab[...,1]
bgL = cv2.medianBlur(cv2.cvtColor(im,cv2.COLOR_BGR2GRAY), 61).astype(np.float32)*100/255*2.55
bgA = cv2.medianBlur(lab[...,1].astype(np.uint8), 61).astype(np.float32)
ink = ((bgL - L) > 18) | ((A - bgA) > 10)
region = np.zeros((H,W), np.uint8)
# date text polygon (inside red frame)
cv2.fillPoly(region, [np.array([(188,732),(1126,660),(1132,792),(190,846)])], 1)
cv2.fillPoly(region,[np.array([(112,886),(1188,826),(1188,1092),(112,1092)])],1)   # script + underline
cv2.rectangle(region,(240,1090),(1064,1160),1,-1)  # subline
cv2.rectangle(region,(286,1296),(1030,1356),1,-1)  # banner text
cv2.rectangle(region,(336,1420),(956,1464),1,-1)   # footer
mask = (ink & (region>0)).astype(np.uint8)*255
mask = cv2.dilate(mask, np.ones((7,7),np.uint8))
date = np.zeros((H,W),np.uint8); cv2.fillPoly(date,[np.array([(188,732),(1126,660),(1132,792),(190,846)])],1)
dm = ((((A-bgA)>4)|((bgL-L)>10)) & (date>0)).astype(np.uint8)*255
mask = mask | cv2.dilate(dm, np.ones((11,11),np.uint8)) & (date*255)
out = cv2.inpaint(im, mask, 9, cv2.INPAINT_TELEA)
# add paper grain into the filled area
sample = im[560:640, 720:880].astype(np.float32)
hf = sample - cv2.GaussianBlur(sample,(0,0),6)
tile = np.tile(hf, (H//hf.shape[0]+1, W//hf.shape[1]+1, 1))[:H,:W]
soft = cv2.GaussianBlur(mask.astype(np.float32)/255,(0,0),3)[...,None]
out = np.clip(out.astype(np.float32) + tile*soft*0.9, 0, 255).astype(np.uint8)
cv2.imwrite('/tmp/winterpost-plakat-clean.png', out)
