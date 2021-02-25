// General
import React, { useState } from 'react';
import styled from 'styled-components';

// External
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';

// Local
import * as ERC20Api from '../../utils/ERC20Api';
import { Token } from '../../types';

// ------------------------------------------
//                  Props
// ------------------------------------------
type ERC20ApproveProps = {
  selectedEthAccount: string;
  bridgeERC20AppContract: any;
  erc20TokenContract: any;
  selectedToken: Token;
  currentTokenBalance: Number;
};

// ------------------------------------------
//           ERC20Approve component
// ------------------------------------------
function ERC20Approve({
  bridgeERC20AppContract,
  erc20TokenContract,
  selectedEthAccount,
  selectedToken,
  currentTokenBalance
}: ERC20ApproveProps): React.ReactElement {

  // User input state
  const [approvalAmount, setApprovalAmount] = useState<Number | string>('');

  // Handlers
  const handleApproveERC20 = async () => {
    await ERC20Api.approveERC20(erc20TokenContract, bridgeERC20AppContract._address,
      selectedEthAccount, await ERC20Api.addDecimals(selectedToken, `${approvalAmount}`))
  };

  // Render
  return (
    <Box>
      <Box>
        <Box marginTop={'15px'} />
        <Divider />
        <Box marginTop={'15px'} />
        <Typography gutterBottom variant="h5">
          1. Approve
      </Typography>
        <Typography gutterBottom>
          How many {selectedToken.symbol} tokens would you like to approve to the ERC20 bridge?
      </Typography>
        <TextField
          InputProps={{
            value: approvalAmount,
          }}
          id="erc-input-approval"
          margin="normal"
          type="number"
          onChange={(e) => setApprovalAmount(e.target.value ? Number(e.target.value) : '')}
          placeholder={`0.00 ${selectedToken.symbol}`}
          style={{ margin: 5 }}
          variant="outlined"
        />
        <Box alignItems="center" display="flex" justifyContent="space-around">
          <Box>
            <Typography>
              Current {selectedToken.symbol} token balance: {Number(currentTokenBalance).toFixed(selectedToken.decimals)} {selectedToken.symbol}
            </Typography>
          </Box>
          <Box
            alignItems="center"
            display="flex"
            height="100px"
            paddingBottom={1}
            paddingTop={2}
            width="300px"
          >
            <Button
              color="primary"
              fullWidth={true}
              onClick={() => handleApproveERC20()}
              variant="outlined"
            >
              <Typography variant="button">Approve</Typography>
            </Button>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box marginTop={'15px'}>
        <Typography gutterBottom variant="h5">
          2. Send
        </Typography>
      </Box>
    </Box >
  );
}

export default styled(ERC20Approve)`
  opacity: 0.5;
  padding: 1rem 1.5rem;
`;