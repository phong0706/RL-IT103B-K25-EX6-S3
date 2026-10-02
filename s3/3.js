const towelPrice = 20000;
const lockPrice = 15000;
const depositFee = 50000;

let isCardVerified = false;
let memberTier = "STANDARD";
let rawSupplyString = "TOWEL:2|LOCK:1";

let menuChoice = 3; 

do {
  const currentStep = menuChoice;

  switch (currentStep) {
    case 1:
      const rawCardInput = "  vip-001  ";
      const cleanCard = rawCardInput.trim().toUpperCase();

      if (cleanCard.startsWith("VIP") || cleanCard.startsWith("STD")) {
        isCardVerified = true;
        if (cleanCard.startsWith("VIP")) {
          memberTier = "VIP";
        } else {
          memberTier = "STANDARD";
        }
        console.log(`Xác thực thẻ thành công. Hạng hội viên: ${memberTier}`);
      } else {
        isCardVerified = false;
        console.log("Mã thẻ không hợp lệ.");
      }

      menuChoice = 3;
      break;

    case 2:
      rawSupplyString = "TOWEL:2|LOCK:1";
      console.log("Đã ghi nhận chuỗi mượn vật tư:", rawSupplyString);

      menuChoice = 3;
      break;

    case 3:
      isCardVerified = true;
      memberTier = "VIP";

      if (!isCardVerified) {
        console.log("Lỗi: Vui lòng quét và xác thực thẻ hội viên (Chức năng 1) trước khi in phiếu!");
        menuChoice = 4;
        break;
      }

      let assignedZone = "ZONE-B";
      if (memberTier === "VIP") {
        assignedZone = "ZONE-A";
      }

      let towelCount = 0;
      let lockCount = 0;

      let workingString = rawSupplyString;
      while (workingString.length > 0) {
        let separatorIndex = workingString.indexOf("|");
        let currentItemPair = "";

        if (separatorIndex !== -1) {
          currentItemPair = workingString.slice(0, separatorIndex);
          workingString = workingString.slice(separatorIndex + 1);
        } else {
          currentItemPair = workingString;
          workingString = "";
        }

        let colonIndex = currentItemPair.indexOf(":");
        if (colonIndex !== -1) {
          let itemKey = currentItemPair.slice(0, colonIndex);
          let itemVal = Number(currentItemPair.slice(colonIndex + 1));

          if (itemKey === "TOWEL") {
            towelCount = itemVal;
          } else if (itemKey === "LOCK") {
            lockCount = itemVal;
          }
        }
      }

      let billTowelCount = towelCount;
      if (memberTier === "VIP" && billTowelCount > 0) {
        billTowelCount = billTowelCount - 1;
      }

      const towelTotal = billTowelCount * towelPrice;
      const lockTotal = lockCount * lockPrice;
      const totalSupplyFee = towelTotal + lockTotal;
      const finalPayable = totalSupplyFee + depositFee;

      const borderLine = "=".repeat(45);
      console.log(borderLine);
      console.log("        PHIẾU BÀN GIAO TỦ ĐỒ & VẬT TƯ       ");
      console.log(borderLine);
      console.log(`- Phân hạng hội viên : ${memberTier}`);
      console.log(`- Khu vực tủ phân bổ : ${assignedZone}`);
      console.log(`- Khăn tắm mượn      : ${towelCount} chiếc (${memberTier === "VIP" ? "Miễn phí 1 chiếc" : "Tính phí"})`);
      console.log(`- Khóa tủ phụ mượn   : ${lockCount} chiếc`);
      console.log(`- Phụ phí vật tư     : ${totalSupplyFee.toLocaleString("vi-VN")} VNĐ`);
      console.log(`- Tiền đặt cọc hoàn  : ${depositFee.toLocaleString("vi-VN")} VNĐ`);
      console.log(`- Tổng thanh toán    : ${finalPayable.toLocaleString("vi-VN")} VNĐ`);
      console.log(borderLine);

      menuChoice = 4;
      break;

    case 4:
      console.log("Đã đóng ca làm việc và thoát hệ thống.");
      break;

    default:
      menuChoice = 4;
      break;
  }
} while (menuChoice !== 4);