----- MATERIAL -----
- Material như là lớp da của object, lớp vật liệu bao phủ cấu trúc dạng lưới bên trong định hình cho vật liệu cấu thành từ gì và màu sắc ra sao 
- Có nhiều dạng vật liệu khác nhau nhưng theo tôi chia đơn giản trong ThreeJS ra làm hai loại:
    * Basic: Basic material là màu và vật liệu cơ bản của object, nó sẽ quy định rõ 1 màu không đổi, ko ánh xạ, ko có nhiều thứ ảnh hưởng MeshBasicMaterial (Khá là đơn điệu).
    * Flexible: Những material còn lại ko phải basic (đơn giản z thôi) :))
        - Một số Material: MeshDepthMaterial, MeshStandardMaterial, MeshPhysicalMaterial,...
        - Với flexible material khi chúng ta không khai báo thuộc tính light cho vật liệu thì sẽ có màu đen, ko áp dụng màu trong color property.
--------------------------------------------------------------