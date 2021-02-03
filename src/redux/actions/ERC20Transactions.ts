import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Web3 from "web3";
import { CREATE_CONTRACT_INSTANCE, SET_CONTRACT_ADDRESS, SET_TOKEN_ALLOWANCE, SET_TOKEN_BALANCE, SET_TOKEN_NAME } from "../actionsTypes/ERC20Transactions";
import * as ERC20Api from '../../utils/ERC20Api';

// action creators
export interface SetContractAddressPayload { type: string, contractAddress: string };
export const setContractAddress = (contractAddress: string): SetContractAddressPayload => ({
    type: SET_CONTRACT_ADDRESS,
    contractAddress
});

export interface CreateContractInstancePayload { type: string, contractAddress: string, web3: Web3 };
export const createContractInstance = (contractAddress: string, web3: Web3): CreateContractInstancePayload => ({
    type: CREATE_CONTRACT_INSTANCE,
    contractAddress,
    web3
})

export interface SetERC20AllowancePayload { type: string, allowance: Number };
export const setERC20Allowance = (allowance: Number): SetERC20AllowancePayload => ({
    type: SET_TOKEN_ALLOWANCE,
    allowance
})

export interface SetERC20BalancePayload { type: string, balance: Number };
export const setERC20Balance = (balance: Number): SetERC20BalancePayload => ({
    type: SET_TOKEN_BALANCE,
    balance
})

export interface SetTokenNamePayload { type: string, name: string };
export const setTokenName = (name: string): SetTokenNamePayload => ({
    type: SET_TOKEN_NAME,
    name
})

// async middleware actions
export const fetchERC20Allowance = (contractInstance: any, userAddress: string, ERC20BridgeContractAddress: string):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
        return async (dispatch: ThunkDispatch<{}, {}, AnyAction>): Promise<void> => {
            const allowance: number = await ERC20Api.fetchERC20Allowance(contractInstance, userAddress, ERC20BridgeContractAddress);
            const formattedAllowance: number = await ERC20Api.removeDecimals(contractInstance, allowance);
            dispatch(setERC20Allowance(formattedAllowance));
        }
}
    
export const fetchERC20Balance = (contractInstance: any, userAddress: string):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {},AnyAction>) => {
        const balance: number = await ERC20Api.fetchERC20Balance(contractInstance,userAddress)
        const formattedBalance = await ERC20Api.removeDecimals(contractInstance, balance)
        dispatch(setERC20Balance(formattedBalance))
    }
}

export const fetchERC20TokenName = (contractInstance: any):
    ThunkAction<Promise<void>, {}, {}, AnyAction> => {
    return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const name = await ERC20Api.fetchERC20Name(contractInstance)
        dispatch(setTokenName(name))
    }
}