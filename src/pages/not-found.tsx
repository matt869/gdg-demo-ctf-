import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertCircle className="h-7 w-7 text-destructive" />
            <h1 className="text-2xl font-display font-bold text-foreground">
              404 - Page not found
            </h1>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            That page does not exist. It may have been moved or renamed.
          </p>

          <Link href="/">
            <Button>Back to home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
