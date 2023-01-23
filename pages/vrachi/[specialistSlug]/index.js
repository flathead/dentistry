import { findSpecialistBySlug } from '@/api-lib/db/specialist';
import { getMongoDb } from '@/api-lib/mongodb';
import Doctor from '@/components/Doctors/Doctor';
import { HeadSEO } from '@/components/Layout';

export default function DoctorPage({ doctor }) {
  if (typeof doctor.createdAt !== 'string') {
    doctor.createdAt = new Date(doctor.createdAt);
  }
  return (
    <>
      <HeadSEO
        title={`${doctor.name}: ${doctor.speciality}`}
        description={`${doctor.name}: ${doctor.speciality} в Стоматологии на Демонстрации со стажем более чем ${doctor.experience}!`}
        ogImageUrl={doctor.photo}
        ogTwitterImage={doctor.photo}
        canonicalUrl={`https://dent-71.ru/vrachi/${doctor.slug}`}
      />
      <Doctor doctor={doctor} />
    </>
  );
}

export async function getServerSideProps(context) {
  const db = await getMongoDb();

  const doctor = await findSpecialistBySlug(db, context.params.specialistSlug);
  if (!doctor) {
    return {
      notFound: true,
    };
  }

  doctor._id = String(doctor._id);
  doctor.slug = String(doctor.slug);
  doctor.name = String(doctor.name);
  doctor.experience = String(doctor.experience);
  doctor.speciality = String(doctor.speciality);
  doctor.education = String(doctor.education);
  doctor.creatorId = String(doctor.creatorId);
  doctor.creator._id = String(doctor.creator._id);
  doctor.createdAt = doctor.createdAt.toJSON();
  return { props: { doctor } };
}
