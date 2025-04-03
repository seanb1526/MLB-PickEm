from django.db import models

class Tournament(models.Model):
    id = models.AutoField(primary_key=True)
    start_date = models.DateField()
    end_date = models.DateField()
    entry_fee = models.DecimalField(max_digits=5, decimal_places=2)
    pot_total = models.DecimalField(max_digits=10, decimal_places=2, default=0)

class Game(models.Model):
    id = models.AutoField(primary_key=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    game_date = models.DateField()
    team_home = models.CharField(max_length=50)
    team_away = models.CharField(max_length=50)
    winner = models.CharField(max_length=50, null=True, blank=True)  # Filled in after the game

class Pick(models.Model):
    id = models.AutoField(primary_key=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    email = models.EmailField()
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    pick_team = models.CharField(max_length=50)
    is_correct = models.BooleanField(null=True, blank=True)  # Calculated later

class Payment(models.Model):
    id = models.AutoField(primary_key=True)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    email = models.EmailField()
    amount = models.DecimalField(max_digits=5, decimal_places=2)
    is_verified = models.BooleanField(default=False)

