import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactInfoCard() {
  return (
    <Card className="max-w-lg p-6 mx-auto transition-shadow bg-white border border-gray-200 hover:shadow-2xl rounded-2xl dark:border-gray-700 ">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
          Información de Contacto
        </CardTitle>
        <CardDescription className="text-lg text-gray-600 dark:text-gray-400">
          Contáctanos a través de los siguientes canales:
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 lg:grid lg:grid-cols-1 lg:gap-6">
        <ContactItem
          icon={<MapPin className="text-amber-500 size-7" />}
          title="Dirección"
          description="Supermercado Mi Futuro | Galería"
          segundaDescription="Universidad Popular del Cesar | Valledupar"
        />
        <ContactItem
          icon={<Phone className="text-amber-500 size-7" />}
          title="Teléfono"
          description="(+57) 323 639 7055"
        />
        <ContactItem
          icon={<Mail className="text-amber-500 size-7" />}
          title="Correo Electrónico"
          description="dnataheladosirresistible@gmail.com"
        />
      </CardContent>
    </Card>
  );
}

function ContactItem({
  icon,
  title,
  description,
  segundaDescription,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  segundaDescription?: string;
}) {
  return (
    <div className="flex items-center p-4 space-x-4 bg-gray-100 rounded-lg dark:bg-gray-800">
      {icon}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
        {segundaDescription && (
          <p className="text-gray-600 dark:text-gray-300">
            {segundaDescription}
          </p>
        )}
      </div>
    </div>
  );
}
