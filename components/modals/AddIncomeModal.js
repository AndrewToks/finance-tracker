import React from 'react'
import { useRef,useEffect,useContext } from 'react'
import { currencyFormatter } from '@/lib/utils';
import { financeContext } from '@/lib/store/finance-context';

//Icons
import {FaRegTrashAlt} from 'react-icons/fa'

import Modal from '@/components/Modal'

const AddIncomeModal = ({show, onClose}) => {
    const amountRef = useRef();
    const descriptionRef = useRef();

    const {Income,addIncomeItem,removeIncomeItem} = useContext(financeContext)

    //Handler functions 

    const addIncomeHandler = async (e) =>{
        e.preventDefault();

        const newIncome = {
            amount : +amountRef.current.value,
            description : descriptionRef.current.value,
            createdAt: new Date()
        };
        try {
            await addIncomeItem(newIncome); 
        } catch (error) {
            console.log(error.message);
            
        }
            descriptionRef.current.value = ""
            amountRef.current.value = ""
    }
    const deleteIncomeEntryHandler = async (incomeId) => {
       try {
        await removeIncomeItem(incomeId)
       } catch (error) {
        console.log(error.message);
        
       }
      };

      
  return (
    <Modal show={show} onClose={onClose}>
            <form className='flex flex-col gap-4' onSubmit={addIncomeHandler}>
                <div className='input-group'>
                <label htmlFor="amount">Income Amount</label>
                <input name='amount' ref={amountRef} type="number" min={0.01} step={0.01} placeholder='Enter Income Amount' required/>
                </div>
                <div className='input-group'>
                <label htmlFor="amount">Description</label>
                <input name='description' ref={descriptionRef} type="text" placeholder='Enter Income Description' required/>
                </div>
               <button type='submit' className='btn btn-primary'>Add Entry</button>
            </form>

               <div className='flex flex-col gap-4 mt-6'>
                <h3 className='text-2xl font-bold'>Income History</h3>
                {Income.map(i =>{
                    return(
                        <div key={i.id} className='flex items-center justify-between'>
                            <div>
                                <p className='font-semibold'>{i.description}</p>
                                <small className='text-xs'>{i.createdAt.toISOString()}</small>
                            </div>
                            <p className='flex items-center gap-2'>{currencyFormatter(i.amount)}</p>
                            <button onClick={() => deleteIncomeEntryHandler(i.id)}><FaRegTrashAlt /></button>
                        </div>
                    )
                })}
               </div>
        </Modal>
  )
}

export default AddIncomeModal