const Research = () => {
  return (
    <>
      <div>
        <p className="text-l text-gray-400 font-semibold text-center mt-4">
          Topic:
        </p>
        <p className="text-2xl text-gray-800 font-semibold text-center">
          Steel Weight Estimation Using Image Processing
        </p>
        <p className="text-md text-gray-500 font-semibold text-center mt-5">
          เนื่องจากปัญหาของ scrap yard ส่วนใหญ่คือการจัดการวัตถุดิบและการจัดการ
          stock
          ด้วยหากต้องการวัดน้ำหนักที่ค่อนข้างแม่นยำจำเป็นจะต้องขนสินค้าขึ้นรถและชั่งจากน้ำหนักจริงเป็นการสิ้นเปลืองเชื้อเพลิงและทรัพยากรด้านอื่นเป็นจำนวนมาก
          จึงได้มีแนวทางคิดที่จะทำวิจัยชิ้นนี้มา โดยใช้เทคโนโลยี OpenCV
          เป็นการทำ Image Processing ซึงเป็นวิธีการที่ประหยัดโดยจะมีการถ่ายรูป 2
          ด้านและนำมา process ตามลำดับทั้งการใช้เทคนิคต่างๆ เช่น watershed /
          otsu method เป็นต้น หากการทดลองข้างต้นสำเร็จจะเป็นการพัฒนา flow
          การทำงานตาม scrap yard ทั่วประเทศด้วย automation ตัวนี้
        </p>
        <img
          className="w-96 grid flex-wrap mx-auto justify-center mt-5"
          src="https://static.wixstatic.com/media/cb812a_d6343c8717b946ea818826c14696b6cb~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_auto/cb812a_d6343c8717b946ea818826c14696b6cb~mv2.jpg"
        />
      </div>
    </>
  );
};

export default Research;
