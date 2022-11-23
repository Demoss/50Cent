import { Divider, List, Typography } from 'antd';

const data = [
  '[28.03.2022] You are offered an interest rate of 12%. To confirm or reject, go to the menu above.',
  '[18.07.2022] Your loan application has been successfully processed and invested.',
  '[13.06.2022] A new payment term was offered for your loan application.',
  '[06.07.2022] You pay loan installments on time, your rating grows.',
  '[06.07.2022] Several investors turned away at your behest. We offer to hold an auction.',

  '[28.03.2022] You offered an interest rate of 15%. We are waiting for confirmation from the borrower.',
  '[18.07.2022] You have successfully invested a loan from Vasyl Kolomia.',
  '[13.06.2022] A new payment term was offered for the loan application that you were considering.',
  '[07.07.2022] This month you received a record amount of payments from borrowers',
  '[06.07.2022] A few more investors were interested in the store that you turned away from. ',

  "[06.07.2022] If you're reading this, we're assuming you've run out of things to look at on our site.",
];

export const Messages = () => {
  return (
    <>
      <Divider orientation="left">Your notifications</Divider>
      <List
        header={<div>New messages</div>}
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Typography.Text mark>[msg]</Typography.Text> {item}
          </List.Item>
        )}
      />
    </>
  );
};
