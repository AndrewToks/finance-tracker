import Modal from '@/components/Modal'
import { useState } from 'react'
function AddExpensesModal({show,onClose}){

    const [expenseAmount,setExpenseAmount] = useState("")

    return(<Modal show={show} onClose={onClose}>
        <div className='flex flex-col gap-4'>
            <label>Enter an amount</label>
            <input type="number" min={0.01} step={0.01}
            placeholder='Enter expense amount' value={expenseAmount}
            onChange={(e)=> { setExpenseAmount(e.target.value)}}/>
        </div>
    </Modal>
    )
}
export default AddExpensesModal