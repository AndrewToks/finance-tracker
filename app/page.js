'use client'
import { currencyFormatter } from '@/lib/utils';
import ExpenseCategory from '@/components/ExpenseCategory';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'
import {Doughnut} from 'react-chartjs-2'
import { useState,useContext, useEffect } from 'react';
import {financeContext} from '@/lib/store/finance-context'
import AddExpensesModal from "@/components/modals/AddExpensesModal"
import AddIncomeModal from '@/components/modals/AddIncomeModal';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home(){
    const [showAddIncomeModal,setShowAddIncomeModal] = useState(false);
    const [showAddExpenseModal,setShowAddExpenseModal] = useState(false);

    const [balance,setBalance] = useState(0)

    const {expenses,Income} = useContext(financeContext)

    useEffect(()=>{
        const newBalance = Income.reduce((total, i)=>{
            return total + i.amount;
        },0)-
        expenses.reduce((total,e)=>{
            return total + e.total
        },0);
        setBalance(newBalance)
    },[expenses,Income])
    
    return(
        <>
        {/*Add Income Modal */}
        <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal}/>

        {/* Add Expenses Modal */}
        <AddExpensesModal show={showAddExpenseModal} onClose={setShowAddExpenseModal} />
        <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3 ">
            <small className="text-grey-400 text-md">My Balance</small>
            <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>

        <section className="flex items-center gap-2 py-3">
            <button className="btn btn-primary" onClick={()=>{
                setShowAddExpenseModal(true)
            }}>+ Expenses</button>
            <button onClick={()=>(setShowAddIncomeModal(true))} className="btn btn-primary-outline">+ Income</button>
        </section>

        {/* Expenses */}
        <section className='py-6'>
            <h3 className='text-2xl'>My Expenses</h3>
            <div className='flex flex-col gap-4 mt-6'>
                {expenses.map((expense) =>{
                    return(
                        <ExpenseCategory key={expense.id} color={expense.color} title={expense.title} total={expense.total} />
                    )
                })}
            </div>
        </section>

        {/* Chart Section */}
        <section className='py-6'>
            <h3 className='text-2xl'>Stats</h3>
            <div className='w-1/2 mx-auto'>
                <Doughnut data={{
                    labels:expenses.map((expense) => expense.title),
                    datasets: [
                        {
                            labels: 'Expenses',
                            data: expenses.map((expense) => expense.total),
                            backgroundColor:expenses.map((expense) => expense.color),
                            borderColor:['#10101b'],
                            borderWidth:5
                        },
                    ],
                }} />
            </div>
        </section>
        </main>
        </>
    )
}