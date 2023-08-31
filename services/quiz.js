export const getQuestions = async () => {
  try {
    const res = await fetch('https://opentdb.com/api.php?amount=15');
    if(res.status === 200) {
      return await res.json();
    }
    return {};
  } catch {
    console.log('err while fetching questions-- ', err);
    return {};
  }
}