'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubTableItam from '../../Components/AdminComponents/SubTableItam';

const page = () => {
    const [emails, setEmails] = useState([]);
    const fetchEmails = async () => {
        const response = await axios.get("/api/email");
        setEmails(response.data.emails);
        console.log(response.data.emails);
    }
    const deleteEmail =  async(id)=>{
        const response = await axios.delete(`/api/email?id=${id}`);
        toast.success("Email Deleted");
        fetchEmails();
    }
    useEffect(() => {
        fetchEmails();
    }, []);

    return (
        <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
            <h1 className="text-xl font-semibold"> All Subsciption</h1>
            <div className="relative overflow-x-auto mt-10">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                              Email Subscription
                            </th>
                            <th scope="col" className="hidden sm:block px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {emails.map((email, index) => {
                            return (
                                <SubTableItam
                                    key={index}
                                    mongoId={email._id}
                                    email={email.email}
                                    date={email.date}
                                    deleteEmail={deleteEmail}
                                />
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
    

}

export default page