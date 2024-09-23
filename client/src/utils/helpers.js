import icons from "../utils/icons";
const { RiStarHalfFill, FaStar, FaRegStar } = icons;
export const createSlug = (string) => {
  // console.log(string); // Check the value and its type
  return string
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(" ")
    .join("-");
};

export const capitalizedStr = (str) =>
  str?.charAt(0).toUpperCase() + str?.slice(1);

export const formatMonney = (number) =>
  Number((Math.round(number / 1000) * 1000)?.toFixed(1)).toLocaleString();

export const numberToStar = (number) => {
  const star = [];
  const integerPart = Math.floor(number); // Phần nguyên
  const decimalPart = number - integerPart; // Phần thập phân
  if (integerPart === 0) {
    // Giá trị number là 0
    for (let i = 0; i < 5; i++) {
      star.push(<FaRegStar key={i} color="orange" />);
    }
  } else {
    for (let i = 0; i < integerPart; i++) {
      star.push(<FaStar key={i} color="orange" />);
    }
    if (0.1 <= decimalPart && decimalPart <= 0.9) {
      star.push(<RiStarHalfFill key={integerPart} color="orange" />);
    }
    for (let i = star.length; i < 5; i++) {
      star.push(<FaRegStar key={i} color="orange" />);
    }
  }
  return star;
};

export const validate = (payload, setInvalidFields) => {
  let invalids = 0;
  const formatpayload = Object.entries(payload);
  for (let arr of formatpayload) {
    if (arr[1].trim() === "") {
      invalids++;
      setInvalidFields((prev) => [
        ...prev,
        { name: arr[0], mes: "Require this fields." },
      ]);
    }
  }
  for (let arr of formatpayload) {
    switch (arr[0]) {
      case "email":
        const regux =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!arr[1].match(regux)) {
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "email không hợp lệ!" },
          ]);
        }
        break;
      case "password":
        if (arr[1] && arr[1].length < 8) {
          // Kiểm tra mật khẩu yếu
          invalids++;
          setInvalidFields((prev) => [
            ...prev,
            { name: arr[0], mes: "Mật khẩu yếu!" },
          ]);
        }
        break;
    }
  }

  return invalids;
};

export const generateRange = (start, end) => {
  const length = end + 1 - start;
  return Array.from({ length }, (_, index) => start + index);
};

export const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
};

export const milisecondstoHMS = (milliseconds) => {
  const hours = Math.floor(milliseconds / (1000 * 60 * 60));
  const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

  return { hours, minutes, seconds };
};
