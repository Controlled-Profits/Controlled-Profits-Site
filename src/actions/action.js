

export default function submitInputForm() {
  console.log('submitted Input form');
  return (dispatch, getState) => {
    const form = getState().form;
    console.log('in return of action',form);
    const formData = {
      totalEarnedRevenue: form.tempForm.totalEarnedRevenue.value
    }
    console.log('form before dispatch', formData.totatlEarnedRevenue);
    dispatch({
      type: 'SUBMIT_INPUT_FORM',
      formData
    });
  }
}
