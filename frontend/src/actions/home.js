async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data, formData.get("fName"));
  return null;
}

export default action;
