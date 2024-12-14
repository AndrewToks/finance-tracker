import Modal from '@/components/Modal'
import { useState,useContext,useRef } from 'react'
import { financeContext } from '@/lib/store/finance-context'
import { v4 as uuidv4 } from 'uuid';


function AddExpensesModal({show,onClose}){

    const [expenseAmount,setExpenseAmount] = useState("");
    const [selectedCategory,setSelectedCategory] = useState(null)

    const {expenses,addExpenseItem } = useContext(financeContext);

    const titleRef = useRef()

    const addExpensesItemHandler = async () =>{

        const expense = expenses.find(e =>{
            return e.id === selectedCategory
        })
        const newExpense = {
            color:expense.color,
            title:expense.title,
            total:expense.total + +expenseAmount,
            item:[
                ...expense.items,
                {
                    amount: +expenseAmount,
                    createdAt : new Date(),
                    id:uuidv4(),
                }
            ]
        }

        try {
            await addExpenseItem(selectedCategory,newExpense);
            console.log(newExpense);
            // window.location.reload();
            setExpenseAmount("");
            setSelectedCategory(null);
            onClose();            
        } catch (error) {
            console.log(error.message)
        }

        
    }

    return(<Modal show={show} onClose={onClose}>
        <div className='flex flex-col gap-4'>
            <label>Enter an amount</label>
            <input type="number" min={0.01} step={0.01}
            placeholder='Enter expense amount' value={expenseAmount}
            onChange={(e)=> { setExpenseAmount(e.target.value)}}/>
        </div>

        {/* Expense Categories */}
        {expenseAmount > 0 && (
            <div className='flex flex-col gap-4 mt-6'>
                <div className='flex items-center justify-between'>
                <h3 className='text-2xl capitalize'>Select Expense Category</h3>
                <button className='text-lime-400 '>+New Category </button>
                </div>

                <div>
                    <input type="text" placeholder='Enter title' ref={titleRef} />
                    <label>Pick Color</label>
                </div>

            {expenses.map((expense)=>{
                return(
                    <button  
                    key={expense.id}  
                    onClick={()=>{
                        setSelectedCategory(expense.id)
                    }}>
                    <div style={{boxShadow : expense.id === selectedCategory ? "1px 1px 4px" : "none"}} className='flex items-center justify-between px-4 py-4 bg-slate-700 rounded-3xl' >
                        <div className="flex items-center gap-2">
                        {/* colored circle */}
                        <div className='w-[25px] h-[25px] rounded-full' style={{backgroundColor: expense.color,}} />
                        <h4 className='capitalize'>{expense.title}</h4>
                        </div>
                    </div>
                    </button>
                )
            })}
            </div>
        )}

        {expenseAmount > 0 && selectedCategory && (
            <div className='mt-6'>
            <button className='btn btn-primary' onClick={addExpensesItemHandler}>
                Add Expense
            </button>
            </div>
        )}
        
    </Modal>
    )
}
export default AddExpensesModal