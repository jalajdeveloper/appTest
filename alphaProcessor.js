require('core-js'); // <- at the top of your entry point
const _ = require('lodash');
const winston = require('winston');

const processData = (data) => {
    let finalData = [];
    if(data){
        let final = []
        final = data?.schools?.map((sc) => {
            sc.members = [];
            data?.members?.map((it) => {
                if(it.role === 'teacher'){
                    if(sc.id === it.school_id){
                        sc.members = sc.members.concat(it)
                    }
                }
            })
            return sc;
        })
        finalData = final?.map((st) => {
            st.members = st?.members?.map((tc) => {
                tc.students = []
                data?.members.map((it) => {
                    if(tc.id === it.teacher_id) {
                        tc.students = tc.students.concat(it)
                    }
                })
                tc.marks = tc.students.reduce((total, obj) => (obj.marks || 0) + total,0)
                tc.students = tc.students.sort((a, b) => b.marks - a.marks);
                return tc;
            })
            st.marks = st.members.reduce((total, obj) => (obj.marks || 0) + total,0)
            st.members = st.members.sort((a, b) => b.marks - a.marks);
            return st;
        })
        finalData = finalData.sort((a,b) => b.marks - a.marks)
    }
    return finalData;
}

module.exports = {
    processData
}
