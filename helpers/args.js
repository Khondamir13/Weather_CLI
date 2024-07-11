const getArgs = (args) => {
  const res = {};
  const [executer, file, ...rest] = args; // process argv dan kelayotgan massivdagi malumotlarni uchta o'zgaruvchiga olib olish joyi
  rest.forEach((value, index, array) => {
    if (value.charAt(0) == "-") {
      // charAt(index) string turda, berilgan  indexda turgan qiymatni qaytaradi
      if (index == array.length - 1) {
        res[value.substring(1)] = true; // substring(start, end) string malumot turini qirqib oladi
      } else if (array[index + 1].charAt(0) != "-") {
        res[value.substring(1)] = array[index + 1];
      } else {
        res[value.substring(1)] = true;
      }
    }
  });
  return res; // object qaytadi
};

export default getArgs; // default qilib yuborsak shunchaki olishimiz mumkin boladi
