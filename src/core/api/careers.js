import ApiService from "@services/apiService";

const dummyData = {
    data: {
        id: 1,
        job_title: "Job Title",
        job_description:
            "Ensure . Research new IT systems and technological trends to help the company grow and use current software programs effectively.",
        job_requirements:
            "Bachelor’s degree or its foreign equivalent in Information Security and Assurance, Information Technology Management or Computer Forensics or a closely related field. ",
        primary_worksite:
            "SJ Computers, 2817 Eagandale Blvd, Eagan, MN 55121. ",
        work_hours: "40",
        salary: "1,00,000",
    },
};
export function getJobDetails() {
    return new Promise((resolve, reject) => {
        // ApiService.get(`/brands`)
        //     .then((response) => {
        //         console.print("file: brands.js | brands| response", response);
        //         resolve(response);
        //     })
        //     .catch((e) => {
        //         console.print("Console Log: : error brands", e);
        //         reject(e);
        //     });
        setTimeout(() => {
            resolve(dummyData);
        }, 2000);
    });
}
export function CreateCareer(CareerData) {
    const formData = new FormData();
    for (const key in CareerData) {
        if (Array.isArray(CareerData[key])) {
            CareerData[key].forEach((item, index) => {
                formData.append(`${key}[${index}]`, item);
            });
        } else {
            formData.append(key, CareerData[key]);
        }
    }
    console.log('formData', formData);
    return new Promise((resolve, reject) => {
        ApiService.post('/store-career-applications', formData)
            .then(response => {
                resolve(response);
            })
            .catch(e => {
                reject(e);
            });
    });
}