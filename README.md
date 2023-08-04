# CT519
## CT519 final

### หลักการออกแบบ 
แยกระบบออกเป็นหน้าบ้านและหลังบ้าน โดยใช้หน้าบ้านเป็น react และหลังบ้านเป็น nodeJS โดยหลังบ้านทำหน้าที่เป็น api 
และใช้ cloud database mongoDB Atlas ที่เป็น noSQL โดนจะมีการใช้ docker แบ่งเป็น frontend และ backend แยก container กัน
ส่วน cloud ที่ใช้ deploy นั้นจะเป็น aws ec2 

### สถาปัตยกรรม 
arm64 

### topology ของระบบ 
1.frontend(react) connects to backend(nodeJS) using API
2.backend connects to mongoDB via mongodb package in nodeJS
3.each container connects to each other by docker network

### การออกแบบฐานข้อมูล 
ใช้ model ใน nodeJS จัดการ schema โดยทำเป็นรูปแบบ object แบ่งเป็น
ชื่อ / คำอธิบาย / ราคา / รูป
โดยแต่ละแบบจะมีการเก็บ data type ต่างกันไป เช่น ชื่อจะเก็บเป็น STRING 
จัดการรูปแบบฐานข้อมูลรวมถึงการเรียกใช้โดยใช้ package mongoose

### การอธิบายส่วนของ code ที่สำคัญ  
จะเป็นด้านการทำระบบหลังบ้าน
model ใช้ define รูปแบบฐานข้อมูลที่จะเก็บ
controller ใช้กำหนด logic ที่ใช้ใน application โดยจะนำไปใช้ในแต่ละ route

ด้านหน้าบ้าน
ตรงการ fetch ข้อมูลทั้ง get/put/post/delete และการส่งข้อมูลกลับมาหลังบ้านโดยใช้ FormData


### การเตรียมการระบบ Cloud 
เป็นการใช้ ec2 โดยใช้ aws linux ในการทำ และ install docker environment รวมถึง git เพืื่อ clone data มาเพื่อ deploy 

... to be continue

การ deploy ตัว code มาทำงาน 
